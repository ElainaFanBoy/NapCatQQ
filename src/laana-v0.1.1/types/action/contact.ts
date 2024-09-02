// @generated by protobuf-ts 2.9.4
// @generated from protobuf file "action/contact.proto" (package "Laana", syntax proto3)
// tslint:disable
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Group } from "../entity/group";
import { UserEntity } from "../entity/user";
import { Peer } from "../entity/message";
/**
 * @generated from protobuf message Laana.GetAllBuddiesPing
 */
export interface GetAllBuddiesPing {
}
/**
 * @generated from protobuf message Laana.GetAllBuddiesPong
 */
export interface GetAllBuddiesPong {
    /**
     * @generated from protobuf field: repeated string buddyUins = 1;
     */
    buddyUins: string[];
}
/**
 * @generated from protobuf message Laana.GetAllGroupsPing
 */
export interface GetAllGroupsPing {
}
/**
 * @generated from protobuf message Laana.GetAllGroupsPong
 */
export interface GetAllGroupsPong {
    /**
     * @generated from protobuf field: repeated string groupCodes = 1;
     */
    groupCodes: string[];
}
/**
 * @generated from protobuf message Laana.GetRecentContactListPing
 */
export interface GetRecentContactListPing {
    /**
     * @generated from protobuf field: uint32 maxCount = 1;
     */
    maxCount: number;
}
/**
 * @generated from protobuf message Laana.GetRecentContactListPong
 */
export interface GetRecentContactListPong {
    /**
     * @generated from protobuf field: repeated Laana.Peer recentContacts = 1;
     */
    recentContacts: Peer[];
}
/**
 * @generated from protobuf message Laana.GetBuddyInfoPing
 */
export interface GetBuddyInfoPing {
    /**
     * @generated from protobuf field: string buddyUin = 1;
     */
    buddyUin: string;
}
/**
 * @generated from protobuf message Laana.GetBuddyInfoPong
 */
export interface GetBuddyInfoPong {
    /**
     * @generated from protobuf field: Laana.UserEntity buddy = 1;
     */
    buddy?: UserEntity;
}
/**
 * @generated from protobuf message Laana.GetGroupInfoPing
 */
export interface GetGroupInfoPing {
    /**
     * @generated from protobuf field: string groupCode = 1;
     */
    groupCode: string;
}
/**
 * @generated from protobuf message Laana.GetGroupInfoPong
 */
export interface GetGroupInfoPong {
    /**
     * @generated from protobuf field: Laana.Group group = 1;
     */
    group?: Group;
}
// @generated message type with reflection information, may provide speed optimized methods
class GetAllBuddiesPing$Type extends MessageType<GetAllBuddiesPing> {
    constructor() {
        super("Laana.GetAllBuddiesPing", []);
    }
    create(value?: PartialMessage<GetAllBuddiesPing>): GetAllBuddiesPing {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<GetAllBuddiesPing>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetAllBuddiesPing): GetAllBuddiesPing {
        return target ?? this.create();
    }
    internalBinaryWrite(message: GetAllBuddiesPing, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetAllBuddiesPing
 */
export const GetAllBuddiesPing = new GetAllBuddiesPing$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetAllBuddiesPong$Type extends MessageType<GetAllBuddiesPong> {
    constructor() {
        super("Laana.GetAllBuddiesPong", [
            { no: 1, name: "buddyUins", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetAllBuddiesPong>): GetAllBuddiesPong {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.buddyUins = [];
        if (value !== undefined)
            reflectionMergePartial<GetAllBuddiesPong>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetAllBuddiesPong): GetAllBuddiesPong {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string buddyUins */ 1:
                    message.buddyUins.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetAllBuddiesPong, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string buddyUins = 1; */
        for (let i = 0; i < message.buddyUins.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.buddyUins[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetAllBuddiesPong
 */
export const GetAllBuddiesPong = new GetAllBuddiesPong$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetAllGroupsPing$Type extends MessageType<GetAllGroupsPing> {
    constructor() {
        super("Laana.GetAllGroupsPing", []);
    }
    create(value?: PartialMessage<GetAllGroupsPing>): GetAllGroupsPing {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<GetAllGroupsPing>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetAllGroupsPing): GetAllGroupsPing {
        return target ?? this.create();
    }
    internalBinaryWrite(message: GetAllGroupsPing, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetAllGroupsPing
 */
export const GetAllGroupsPing = new GetAllGroupsPing$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetAllGroupsPong$Type extends MessageType<GetAllGroupsPong> {
    constructor() {
        super("Laana.GetAllGroupsPong", [
            { no: 1, name: "groupCodes", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetAllGroupsPong>): GetAllGroupsPong {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.groupCodes = [];
        if (value !== undefined)
            reflectionMergePartial<GetAllGroupsPong>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetAllGroupsPong): GetAllGroupsPong {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string groupCodes */ 1:
                    message.groupCodes.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetAllGroupsPong, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated string groupCodes = 1; */
        for (let i = 0; i < message.groupCodes.length; i++)
            writer.tag(1, WireType.LengthDelimited).string(message.groupCodes[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetAllGroupsPong
 */
export const GetAllGroupsPong = new GetAllGroupsPong$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetRecentContactListPing$Type extends MessageType<GetRecentContactListPing> {
    constructor() {
        super("Laana.GetRecentContactListPing", [
            { no: 1, name: "maxCount", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<GetRecentContactListPing>): GetRecentContactListPing {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.maxCount = 0;
        if (value !== undefined)
            reflectionMergePartial<GetRecentContactListPing>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetRecentContactListPing): GetRecentContactListPing {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 maxCount */ 1:
                    message.maxCount = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetRecentContactListPing, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 maxCount = 1; */
        if (message.maxCount !== 0)
            writer.tag(1, WireType.Varint).uint32(message.maxCount);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetRecentContactListPing
 */
export const GetRecentContactListPing = new GetRecentContactListPing$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetRecentContactListPong$Type extends MessageType<GetRecentContactListPong> {
    constructor() {
        super("Laana.GetRecentContactListPong", [
            { no: 1, name: "recentContacts", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Peer }
        ]);
    }
    create(value?: PartialMessage<GetRecentContactListPong>): GetRecentContactListPong {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.recentContacts = [];
        if (value !== undefined)
            reflectionMergePartial<GetRecentContactListPong>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetRecentContactListPong): GetRecentContactListPong {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated Laana.Peer recentContacts */ 1:
                    message.recentContacts.push(Peer.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetRecentContactListPong, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated Laana.Peer recentContacts = 1; */
        for (let i = 0; i < message.recentContacts.length; i++)
            Peer.internalBinaryWrite(message.recentContacts[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetRecentContactListPong
 */
export const GetRecentContactListPong = new GetRecentContactListPong$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetBuddyInfoPing$Type extends MessageType<GetBuddyInfoPing> {
    constructor() {
        super("Laana.GetBuddyInfoPing", [
            { no: 1, name: "buddyUin", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetBuddyInfoPing>): GetBuddyInfoPing {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.buddyUin = "";
        if (value !== undefined)
            reflectionMergePartial<GetBuddyInfoPing>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetBuddyInfoPing): GetBuddyInfoPing {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string buddyUin */ 1:
                    message.buddyUin = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetBuddyInfoPing, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string buddyUin = 1; */
        if (message.buddyUin !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.buddyUin);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetBuddyInfoPing
 */
export const GetBuddyInfoPing = new GetBuddyInfoPing$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetBuddyInfoPong$Type extends MessageType<GetBuddyInfoPong> {
    constructor() {
        super("Laana.GetBuddyInfoPong", [
            { no: 1, name: "buddy", kind: "message", T: () => UserEntity }
        ]);
    }
    create(value?: PartialMessage<GetBuddyInfoPong>): GetBuddyInfoPong {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<GetBuddyInfoPong>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetBuddyInfoPong): GetBuddyInfoPong {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* Laana.UserEntity buddy */ 1:
                    message.buddy = UserEntity.internalBinaryRead(reader, reader.uint32(), options, message.buddy);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetBuddyInfoPong, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* Laana.UserEntity buddy = 1; */
        if (message.buddy)
            UserEntity.internalBinaryWrite(message.buddy, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetBuddyInfoPong
 */
export const GetBuddyInfoPong = new GetBuddyInfoPong$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetGroupInfoPing$Type extends MessageType<GetGroupInfoPing> {
    constructor() {
        super("Laana.GetGroupInfoPing", [
            { no: 1, name: "groupCode", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetGroupInfoPing>): GetGroupInfoPing {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.groupCode = "";
        if (value !== undefined)
            reflectionMergePartial<GetGroupInfoPing>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetGroupInfoPing): GetGroupInfoPing {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string groupCode */ 1:
                    message.groupCode = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetGroupInfoPing, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string groupCode = 1; */
        if (message.groupCode !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.groupCode);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetGroupInfoPing
 */
export const GetGroupInfoPing = new GetGroupInfoPing$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetGroupInfoPong$Type extends MessageType<GetGroupInfoPong> {
    constructor() {
        super("Laana.GetGroupInfoPong", [
            { no: 1, name: "group", kind: "message", T: () => Group }
        ]);
    }
    create(value?: PartialMessage<GetGroupInfoPong>): GetGroupInfoPong {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<GetGroupInfoPong>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetGroupInfoPong): GetGroupInfoPong {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* Laana.Group group */ 1:
                    message.group = Group.internalBinaryRead(reader, reader.uint32(), options, message.group);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetGroupInfoPong, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* Laana.Group group = 1; */
        if (message.group)
            Group.internalBinaryWrite(message.group, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Laana.GetGroupInfoPong
 */
export const GetGroupInfoPong = new GetGroupInfoPong$Type();
