import { OB11Group } from '@/onebot';
import { OB11Entities } from '@/onebot/entities';
import BaseAction from '../BaseAction';
import { ActionName } from '../types';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
// no_cache get时传字符串
const SchemaData = {
    type: 'object',
    properties: {
        no_cache: { type: ['boolean', 'string'] },
    },
} as const satisfies JSONSchema;

type Payload = FromSchema<typeof SchemaData>;

class GetGroupList extends BaseAction<Payload, OB11Group[]> {
    actionName = ActionName.GetGroupList;
    payloadSchema = SchemaData;

    async _handle(payload: Payload) {
        return OB11Entities.groups(
            await this.core.apis.GroupApi.getGroups(
                typeof payload.no_cache === 'string' ? payload.no_cache === 'true' : !!payload.no_cache));
    }
}

export default GetGroupList;
