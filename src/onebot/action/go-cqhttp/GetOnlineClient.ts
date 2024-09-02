import BaseAction from '../BaseAction';
import { ActionName } from '../types';
import { JSONSchema } from 'json-schema-to-ts';
import { sleep } from '@/common/helper';

const SchemaData = {
    type: 'object',
    properties: {
        no_cache: { type: 'boolean' },
    },
} as const satisfies JSONSchema;

export class GetOnlineClient extends BaseAction<void, Array<any>> {
    actionName = ActionName.GetOnlineClient;

    async _handle(payload: void) {
        //注册监听
        this.core.apis.SystemApi.getOnlineDev();
        await sleep(500);

        return [];
    }
}
