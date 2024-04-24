import { GeneralCallResult } from './common';
import { NodeIKernelProfileListener } from '../listeners';

export interface NodeIKernelProfileService {
    addKernelProfileListener(listener: NodeIKernelProfileListener): void;
    removeKernelProfileListener(listenerId: unknown): void;
    prepareRegionConfig(...args: unknown[]): unknown;
    getLocalStrangerRemark(...args: unknown[]): unknown;
    enumCountryOptions(...args: unknown[]): unknown;
    enumProvinceOptions(...args: unknown[]): unknown;
    enumCityOptions(...args: unknown[]): unknown;
    enumAreaOptions(...args: unknown[]): unknown;
    modifySelfProfile(...args: unknown[]): unknown;
    modifyDesktopMiniProfile(...args: unknown[]): unknown;
    setNickName(...args: unknown[]): unknown;
    setLongNick(...args: unknown[]): unknown;
    setBirthday(...args: unknown[]): unknown;
    setGander(...args: unknown[]): unknown;
    setHeader(...args: unknown[]): unknown;
    setRecommendImgFlag(...args: unknown[]): unknown;
    getUserSimpleInfo(...args: unknown[]): unknown;
    getUserDetailInfo(...args: unknown[]): unknown;
    getUserDetailInfoWithBizInfo(uid: string, arg2: number[]): Promise<GeneralCallResult>;
    getUserDetailInfoByUin(...args: unknown[]): unknown;
    getZplanAvatarInfos(...args: unknown[]): unknown;
    getStatus(...args: unknown[]): unknown;
    startStatusPolling(...args: unknown[]): unknown;
    getSelfStatus(...args: unknown[]): unknown;
    setdisableEmojiShortCuts(...args: unknown[]): unknown;
    getProfileQzonePicInfo(...args: unknown[]): unknown;
    getCoreInfo(...args: unknown[]): unknown;
    isNull(): boolean;
}
