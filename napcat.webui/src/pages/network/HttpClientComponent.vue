<template>
    <div>
        <t-form labelAlign="left">
            <t-form-item label="启用">
                <t-checkbox v-model="config.enable" />
            </t-form-item>
            <t-form-item label="URL">
                <t-input v-model="config.url" />
            </t-form-item>
            <t-form-item label="消息格式">
                <t-select v-model="config.messagePostFormat" :options="messageFormatOptions" />
            </t-form-item>
            <t-form-item label="报告自身消息">
                <t-checkbox v-model="config.reportSelfMessage" />
            </t-form-item>
            <t-form-item label="Token">
                <t-input v-model="config.token" />
            </t-form-item>
            <t-form-item label="调试模式">
                <t-checkbox v-model="config.debug" />
            </t-form-item>
        </t-form>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { HttpClientConfig } from '../../../../src/onebot/config/config';

const props = defineProps<{
    config: HttpClientConfig;
}>();

const messageFormatOptions = ref([
    { label: 'Array', value: 'array' },
    { label: 'String', value: 'string' },
]);

watch(
    () => props.config.messagePostFormat,
    (newValue) => {
        if (newValue !== 'array' && newValue !== 'string') {
            props.config.messagePostFormat = 'array';
        }
    }
);
</script>

<style scoped></style>
