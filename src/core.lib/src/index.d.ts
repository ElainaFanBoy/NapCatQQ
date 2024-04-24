import { EventEmitter } from 'node:events';
import { NapCatCoreService } from './service';
import { NapCatCoreSession } from './session';
import { NapCatCoreLogin } from './login';
import { NapCatCoreWrapper } from './wrapper';
import { QRCodeLoginSucceedType } from './qqnt/services';
import { GlobalAdapter } from './qqnt/adapters';

import * as log4js from '@log4js-node/log4js-api';
export interface LoginSuccessCallback {
    (): void | Promise<void>;
}
export declare class NapCatCore extends EventEmitter {
    readonly log: log4js.Logger;
    readonly adapter: GlobalAdapter;
    readonly wrapper: NapCatCoreWrapper;
    readonly login: NapCatCoreLogin;
    readonly session: NapCatCoreSession;
    readonly service: NapCatCoreService;
    private loginSuccessCbList;
    constructor();
    initPostLogin(args: QRCodeLoginSucceedType): Promise<void>;
    private onLoginSuccess;
    private onMessage;
    addLoginSuccessCallback(cb: LoginSuccessCallback): void;
}
export declare const napCatCore: NapCatCore;
