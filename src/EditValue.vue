<template>
    <span class="val">
        <select name="value" v-model="item.remark" class="val-input" v-if="item.type === 'boolean'">
            <option :value="true">true</option>
            <option :value="false">false</option>
        </select>
        <editable-text v-else :value="item.remark" @change="(v) => {item.remark = v}"></editable-text>
    </span>
</template>

<script>

import EditableText from "./EditableText.vue";
export default {
    name: 'EditValue',
    components: {EditableText},
    props: {item: {}},
    data: function () {
        return {
        }
    },
    methods: {
    }
}
</script>