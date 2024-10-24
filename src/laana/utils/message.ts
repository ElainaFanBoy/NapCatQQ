import {
    AtType,
    ChatType,
    ElementType,
    NapCatCore,
    Peer,
    RawMessage,
    ReplyElement,
    SendMessageElement,
    SendTextElement,
} from '@/core';
import { NapCatLaanaAdapter } from '..';
import {
    LaanaFile,
    LaanaMessage,
    LaanaMessage_Bubble,
    LaanaPeer,
    LaanaPeer_Type,
    LaanaOutgoingMessage,
} from '@laana-proto/def';
import faceConfig from '@/core/external/face_config.json';
import { MessageContext } from '@/onebot/api';

export type SentMessageFileCacheRecord = {
    originalType: LaanaFile['uri']['oneofKind'],
    cacheId: string,
};

type Laana2RawConverters = {
    [key in Exclude<LaanaOutgoingMessage['content']['oneofKind'], undefined>]:
    (
        // eslint-disable-next-line
        // @ts-ignore
        msgContent: Extract<OutgoingMessage['content'], { oneofKind: key; }>[key],
        targetPeer: LaanaPeer,
    ) => PromiseLike<{
        elements: SendMessageElement[],
        fileCacheRecords: SentMessageFileCacheRecord[],
    }>
}

export class LaanaMessageUtils {
    constructor(
        public core: NapCatCore,
        public laana: NapCatLaanaAdapter,
    ) {
    }

    // TODO: deprecate MessageContext
    private createEmptyMessageContext(): MessageContext {
        return {
            deleteAfterSentFiles: [],
            peer: { chatType: ChatType.KCHATTYPEC2C, guildId: '', peerUid: '' },
        };
    }

    l2r: Laana2RawConverters = {
        bubble: async (msgContent, targetPeer) => {
            function at(atUid: string, atNtUid: string, atType: AtType, atName: string): SendTextElement {
                return {
                    elementType: ElementType.TEXT,
                    elementId: '',
                    textElement: {
                        content: `@${atName}`,
                        atType,
                        atUid,
                        atTinyId: '',
                        atNtUid,
                    },
                };
            }

            const elements: SendMessageElement[] = [];
            const fileCacheRecords: SentMessageFileCacheRecord[] = [];

            if (msgContent.repliedMsgId) {
                const replyMsg = (
                    await this.core.apis.MsgApi.getMsgsByMsgId(
                        await this.laanaPeerToRaw(targetPeer),
                        [msgContent.repliedMsgId]
                    )
                ).msgList[0];
                if (!replyMsg) {
                    throw Error('回复的消息不存在');
                }
                const { msgSeq, msgId, senderUin, senderUid } = replyMsg;
                elements.push({
                    elementType: ElementType.REPLY,
                    elementId: '',
                    replyElement: {
                        replayMsgSeq: msgSeq,
                        replayMsgId: msgId,
                        senderUin: senderUin,
                        senderUidStr: senderUid,
                    }
                });
            }

            for (const seg of msgContent.segments) {
                const content = seg.content;
                if (content.oneofKind === 'text') {
                    elements.push({
                        elementType: ElementType.TEXT,
                        elementId: '',
                        textElement: {
                            content: content.text,
                            atType: AtType.notAt,
                            atUid: '',
                            atTinyId: '',
                            atNtUid: '',
                        },
                    });
                } else if (content.oneofKind === 'at') {
                    if (targetPeer.type !== LaanaPeer_Type.GROUP) {
                        throw Error('试图在私聊会话中使用 At');
                    }

                    if (content.at.uin === '0') {
                        elements.push(at(
                            '0', '0',
                            AtType.atAll,
                            '所有人',
                        ));
                    }

                    const atMember = await this.core.apis.GroupApi
                        .getGroupMember(targetPeer.uin, content.at.uin);
                    if (atMember) {
                        elements.push(at(
                            content.at.uin,
                            atMember.uid,
                            AtType.atUser,
                            atMember.cardName || atMember.nick,
                        ));
                    } else {
                        const uid = await this.laana.utils.user.findUidByUinOrThrow(content.at.uin);
                        const info = await this.core.apis.UserApi.getUserDetailInfo(uid);
                        elements.push(at(
                            content.at.uin,
                            uid,
                            AtType.atUser,
                            info.nick || '未知用户',
                        ));
                    }
                } else if (content.oneofKind === 'face') {
                    const parsedFaceId = content.face;
                    // 从face_config.json中获取表情名称
                    const sysFaces = faceConfig.sysface;
                    const face = sysFaces.find((systemFace) => systemFace.QSid === parsedFaceId.toString());
                    if (!face) {
                        throw Error('未知的表情 ID');
                    }

                    const faceType = parsedFaceId >= 222 ?
                        face.AniStickerType ?
                            3 : 2 : 1;
                    elements.push({
                        elementType: ElementType.FACE,
                        elementId: '',
                        faceElement: {
                            faceIndex: parsedFaceId,
                            faceType,
                            faceText: face.QDes,
                            stickerId: face.AniStickerId,
                            stickerType: face.AniStickerType,
                            packId: face.AniStickerPackId,
                            sourceType: 1,
                        },
                    });
                } else if (content.oneofKind === 'image') {
                    const cacheId = await this.laana.utils.file.resolveCacheIdFromLaanaFile(content.image);
                    elements.push(await this.core.apis.FileApi.createValidSendPicElement(
                        this.createEmptyMessageContext(),
                        await this.laana.utils.file.toLocalPath(cacheId)
                    ));
                    fileCacheRecords.push({
                        originalType: content.image.uri.oneofKind,
                        cacheId,
                    });
                } else {
                    throw Error('未知的消息内容类型');
                }
            }

            return { elements, fileCacheRecords };
        },

        file: async msgContent => {
            const cacheId = await this.laana.utils.file.resolveCacheIdFromLaanaFile(msgContent.file!);
            return {
                elements: [
                    await this.core.apis.FileApi.createValidSendFileElement(
                        this.createEmptyMessageContext(),
                        await this.laana.utils.file.toLocalPath(cacheId),
                        msgContent.name,
                    ),
                ],
                fileCacheRecords: [{
                    originalType: msgContent.file!.uri.oneofKind,
                    cacheId,
                }],
            };
        },

        singleImage: async msgContent => {
            const cacheId = await this.laana.utils.file.resolveCacheIdFromLaanaFile(msgContent.image!);
            return {
                elements: [
                    await this.core.apis.FileApi.createValidSendPicElement(
                        this.createEmptyMessageContext(),
                        await this.laana.utils.file.toLocalPath(cacheId),
                        msgContent.displayText, // TODO: make display text optional
                        // TODO: add 'sub type' field
                    )
                ],
                fileCacheRecords: [{
                    originalType: msgContent.image!.uri.oneofKind,
                    cacheId,
                }],
            };
        },

        marketFace: async msgContent => ({
            elements: [{
                elementType: ElementType.MFACE,
                marketFaceElement: {
                    emojiPackageId: msgContent.facePackageId,
                    emojiId: msgContent.faceId,
                    key: msgContent.faceKey,
                    faceName: msgContent.displayText ?? '[商城表情]',
                },
            }],
            fileCacheRecords: [],
        }),

        video: async msgContent => {
            const cacheId = await this.laana.utils.file.resolveCacheIdFromLaanaFile(msgContent);
            return {
                elements: [
                    await this.core.apis.FileApi.createValidSendVideoElement(
                        this.createEmptyMessageContext(),
                        await this.laana.utils.file.toLocalPath(cacheId),
                        // TODO: add file name and thumb path
                    ),
                ],
                fileCacheRecords: [{
                    originalType: msgContent.uri.oneofKind,
                    cacheId,
                }],
            };
        },

        voice: async msgContent => {
            const cacheId = await this.laana.utils.file.resolveCacheIdFromLaanaFile(msgContent);
            return {
                elements: [
                    await this.core.apis.FileApi.createValidSendPttElement(
                        await this.laana.utils.file.toLocalPath(cacheId),
                    )
                ],
                fileCacheRecords: [{
                    originalType: msgContent.uri.oneofKind,
                    cacheId,
                }],
            };
        },

        forwardedMessage: async msgContent => {
            throw Error('Unimplemented');
        },

        musicCard: () => { throw Error('Unimplemented'); },
    };

    installEventListeners() {
        this.core.eventChannel.on('message/receive', async (msg) => {
            await this.laana.networkManager.emitMessage(await this.rawMessageToLaana(msg));
        });

        this.core.eventChannel.on('message/send', async (msg) => {
            if (this.laana.configLoader.configData.reportSelfMessage) {
                await this.laana.networkManager.emitMessage(await this.rawMessageToLaana(msg));
            }
        });
    }

    async laanaPeerToRaw(peer: LaanaPeer): Promise<Peer> {
        const peerUid = peer.type === LaanaPeer_Type.BUDDY ?
            await this.laana.utils.user.findUidByUinOrThrow(peer.uin) :
            peer.uin;
        return {
            chatType: peer.type === LaanaPeer_Type.GROUP ? ChatType.KCHATTYPEGROUP : ChatType.KCHATTYPEC2C,
            guildId: '',
            peerUid,
        };
    }

    async laanaMessageToRaw(msg: LaanaOutgoingMessage, targetPeer: LaanaPeer) {
        if (!msg.content.oneofKind) {
            throw Error('消息内容类型未知');
        }
        return this.l2r[msg.content.oneofKind](
            // eslint-disable-next-line
            // @ts-ignore
            msg.content[msg.content.oneofKind],
            targetPeer
        );
    }

    async rawMessageToLaana(msg: RawMessage, rootForwardMsgId?: string): Promise<LaanaMessage> {
        return {
            msgId: this.encodeMsgToLaanaMsgId(msg.msgId, msg.chatType, msg.peerUid),
            time: BigInt(msg.msgTime),
            senderUin: msg.senderUin,
            peer: {
                uin: msg.peerUin,
                type: msg.chatType === ChatType.KCHATTYPEGROUP ?
                    LaanaPeer_Type.GROUP : LaanaPeer_Type.BUDDY,
            },
            content: await this.createLaanaMessageContent(msg, rootForwardMsgId),
        };
    }

    private async createLaanaMessageContent(msg: RawMessage, rootForwardMsgId?: string): Promise<LaanaMessage['content']> {
        const firstElement = msg.elements[0];

        if (!firstElement) {
            return {
                oneofKind: 'unknownMessage',
                unknownMessage: {
                    rawContent: '',
                }
            };
        }

        if (
            // 图文混排消息
            firstElement.textElement ||
            firstElement.faceElement ||
            firstElement.replyElement ||
            (firstElement.picElement && msg.elements.length > 1)
        ) {
            let repliedMsgId: string | undefined;
            let startingIndex = 0;

            if (firstElement.replyElement) {
                repliedMsgId = await this.getRepliedMsgId(firstElement.replyElement, msg);
                startingIndex = 1;
            }
            const bubble: LaanaMessage_Bubble = { segments: [], repliedMsgId };
            for (let i = startingIndex; i < msg.elements.length; i++) {
                const element = msg.elements[i];
                if (element.textElement) {
                    const textElement = element.textElement;
                    if (textElement.atType === AtType.notAt) {
                        bubble.segments.push({
                            content: {
                                oneofKind: 'text',
                                text: textElement.content.replace(/\r/g, '\n'),
                            },
                        });
                    } else if (textElement.atType === AtType.atUser) {
                        bubble.segments.push({
                            content: {
                                oneofKind: 'at',
                                at: {
                                    groupCode: msg.peerUin,
                                    uin: textElement.atUid,
                                    name: textElement.content.slice(1),
                                }
                            },
                        });
                    } else { // atAll
                        bubble.segments.push({
                            content: {
                                oneofKind: 'at',
                                at: {
                                    groupCode: msg.peerUin,
                                    uin: '0',
                                    name: '全体成员',
                                }
                            },
                        });
                    }
                } else if (element.faceElement) {
                    bubble.segments.push({
                        content: {
                            oneofKind: 'face',
                            face: element.faceElement.faceIndex,
                        },
                    });
                } else if (element.picElement) {
                    bubble.segments.push({
                        content: {
                            oneofKind: 'image',
                            image: {
                                uri: {
                                    oneofKind: 'url',
                                    url: await this.core.apis.FileApi.getImageUrl(element.picElement),
                                }
                            }
                        },
                    });
                } else {
                    this.core.context.logger.logWarn('未知的消息元素类型', element.elementType);
                }
            }
            return { oneofKind: 'bubble', bubble };
        } else {
            if (firstElement.fileElement) {
                return {
                    oneofKind: 'file',
                    file: {
                        file: {
                            uri: {
                                oneofKind: 'cacheId',
                                cacheId: this.laana.utils.file
                                    .encodeFileElementToCacheId(
                                        msg.msgId,
                                        msg.chatType,
                                        msg.peerUid,
                                        firstElement.elementId
                                    ),
                            }
                        },
                        name: firstElement.fileElement.fileName,
                        size: BigInt(firstElement.fileElement.fileSize),
                    },
                };
            } else if (firstElement.picElement) {
                return {
                    oneofKind: 'singleImage',
                    singleImage: {
                        image: {
                            uri: {
                                oneofKind: 'url',
                                url: await this.core.apis.FileApi.getImageUrl(firstElement.picElement),
                            }
                        },
                        displayText: firstElement.picElement.summary || '[图片]',
                    }
                };
            } else if (firstElement.marketFaceElement) {
                return {
                    oneofKind: 'marketFace',
                    marketFace: {
                        faceId: firstElement.marketFaceElement.emojiId,
                        faceKey: firstElement.marketFaceElement.key,
                        facePackageId: firstElement.marketFaceElement.emojiPackageId,
                        displayText: firstElement.marketFaceElement.faceName,
                    }
                };
            } else if (firstElement.videoElement) {
                let cacheId = '';
                const urls = await this.core.apis.FileApi.getVideoUrl(
                    {
                        chatType: msg.chatType,
                        guildId: msg.guildId,
                        peerUid: msg.peerUid,
                    },
                    msg.msgId,
                    firstElement.elementId
                );
                const urlOrEmpty = urls.find(urlWrapper => urlWrapper.url !== '')?.url;
                if (!urlOrEmpty) {
                    this.core.context.logger.logWarn('视频链接获取失败', msg.msgId);
                    cacheId = this.laana.utils.file.encodeFileElementToCacheId(
                        msg.msgId,
                        msg.chatType,
                        msg.peerUid,
                        firstElement.elementId
                    );
                }

                return {
                    oneofKind: 'video',
                    video: {
                        video: {
                            uri: urlOrEmpty ? {
                                oneofKind: 'url',
                                url: urlOrEmpty,
                            } : {
                                oneofKind: 'cacheId',
                                cacheId,
                            }
                        },
                    }
                };
            } else if (firstElement.pttElement) {
                return {
                    oneofKind: 'voice',
                    voice: {
                        voice: {
                            uri: {
                                oneofKind: 'cacheId',
                                cacheId: this.laana.utils.file.encodeFileElementToCacheId(
                                    msg.msgId,
                                    msg.chatType,
                                    msg.peerUid,
                                    firstElement.elementId
                                ),
                            }
                        },
                        duration: 5 // TODO: implement duration field, or... delete it?
                    }
                };
            } else if (firstElement.multiForwardMsgElement) {
                return {
                    oneofKind: 'forwardedMsgRef',
                    forwardedMsgRef: {
                        refId: this.encodeMsgToForwardMsgRefId(
                            rootForwardMsgId ?? this.encodeMsgToLaanaMsgId(msg.msgId, msg.chatType, msg.peerUid),
                            msg.msgId,
                        ),
                        displayText: firstElement.multiForwardMsgElement.xmlContent,
                    }
                };
            } else if (firstElement.arkElement) {
                return {
                    oneofKind: 'arkMessage',
                    arkMessage: {
                        json: firstElement.arkElement.bytesData,
                    }
                };
            } else {
                this.core.context.logger.logWarn('未知的消息元素类型', firstElement.elementType);
                return {
                    oneofKind: 'unknownMessage',
                    unknownMessage: {
                        rawContent: JSON.stringify(msg.elements),
                    }
                };
            }
        }
    }

    encodeMsgToLaanaMsgId(msgId: string, chatType: ChatType, peerUid: string) {
        return `LaanaMsgId@${msgId}@${chatType}@${peerUid}`;
    }

    decodeLaanaMsgId(laanaMsgId: string) {
        if (!laanaMsgId.startsWith('LaanaMsgId@')) {
            throw Error('不合法的 LaanaMsgId');
        }
        const [msgId, chatType, peerUid] = laanaMsgId.split('@').slice(1);
        return {
            msgId,
            chatType: parseInt(chatType),
            peerUid,
        };
    }

    encodeMsgToForwardMsgRefId(
        rootMsgLaanaId: string,
        currentMsgId: string,
    ) {
        return `LaanaForwardMsgRefId|${rootMsgLaanaId}|${currentMsgId}`;
    }

    decodeLaanaForwardedMsgRefId(laanaForwardMsgId: string) {
        if (!laanaForwardMsgId.startsWith('LaanaForwardMsgRefId|')) {
            throw Error('不合法的 LaanaForwardMsgRefId');
        }
        const [rootMsgLaanaId, currentMsgId] = laanaForwardMsgId.split('|').slice(1);
        return {
            rootMsgLaanaId,
            currentMsgId,
        };
    }

    async getRepliedMsgId(element: ReplyElement, msg: RawMessage) {
        const record = msg.records.find(
            msgRecord => msgRecord.msgId === element.sourceMsgIdInRecords
        );

        if (!(record && element.replyMsgTime && element.senderUidStr)) {
            this.core.context.logger.logWarn('获取不到引用的消息', element.replayMsgId);
            return undefined;
        }

        if (record.peerUin === '284840486') {
            return record.msgId;
        }

        const repliedMsgOrEmpty = (await this.core.apis.MsgApi
            .queryMsgsWithFilterExWithSeqV2(
                {
                    chatType: msg.chatType,
                    guildId: msg.guildId,
                    peerUid: record.peerUid,
                },
                element.replayMsgSeq,
                element.replyMsgTime,
                [element.senderUidStr]
            )
        ).msgList.find(msg => msg.msgRandom === record.msgRandom);

        if (!repliedMsgOrEmpty) {
            this.core.context.logger.logWarn('获取不到引用的消息', element.replayMsgId);
            return undefined;
        }

        return repliedMsgOrEmpty.msgId;
    }
}
