<template>
    <div class="block_content">
        <span v-for="(item, index) in parsedData" :key="index" :class="['block', 'clearfix', {'hide-block': hideMyBlock[index] === true}]">
            <span class="json-key">
                <editable-text :isEdit="isEdit" :value="item.name" @change="(nc)=> changeText(item, nc)"></editable-text>
                <i class="collapse-down" v-if="item.type === Types.OBJECT || item.type === Types.ARRAY" @click="closeBlock(index, $event)">
                    <i class="icon-down-open"></i>
                </i>
                <i v-if="isEdit" class="del-btn" @click="delItem(parsedData, item, index)">
                    <i class="icon-trash"></i>
                </i>
                <i v-if="item.type === Types.OBJECT" class="i-type">{{'{' + item.childParams.length + '}'}}</i>
                <i v-if="item.type === Types.ARRAY" class="i-type">{{'[' + item.childParams.length + ']'}}</i>
            </span>
            <span class="json-val">
                <template v-if="item.type === Types.OBJECT">
                    <json-view :isEdit="isEdit" :parsedData="item.childParams" v-model="item.childParams" @change="onChange"></json-view>
                </template>

                <template v-else-if="item.type === Types.ARRAY">
                    <array-view :isEdit="isEdit" :parsedData="item.childParams" v-model="item.childParams" @change="onChange"></array-view>
                </template>

                <template v-else>
                    <edit-value :isEdit="isEdit" :item="item" @change="onChange"></edit-value>
                </template>
            </span>
        </span>

        <item-add-form v-if="toAddItem" @confirm="newItem" @cancel="cancelNewItem"></item-add-form>

        <div v-if="!toAddItem && isEdit" class="block add-key" @click="addItem">
            <i class="icon-plus"></i>
        </div>
    </div>
</template>

<script>
import ItemAddForm from './ItemAddForm.vue'
import EditableText from "./EditableText.vue";
import EditValue from "./EditValue.vue";
import ArrayView from "./ArrayView.vue";

const Types = {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object',
}
export default {
    name: 'JsonView',
    props: {parsedData: {}, isEdit: true},
    data: function () {
        return {
            'toAddItem': false,
            Types: Types,
            'hideMyBlock': {}
        }
    },

    created: function () {
        console.log('PARSED : ', this.parsedData);
    },

    components: {
        ArrayView,
        EditValue,
        EditableText,
        'item-add-form': ItemAddForm
    },
    methods: {
        delItem: function (parentDom, item, index) {
            this.parsedData = this.parsedData.rmIndex(index)
            if(this.hideMyBlock[index]) this.hideMyBlock[index] = false
            this.$emit('input', this.parsedData)
        },

        closeBlock: function (index, e) {
            this.$set(this.hideMyBlock, index, !this.hideMyBlock[index])
        },

        addItem: function () {
            this.toAddItem = true
        },

        cancelNewItem: function () {
            this.toAddItem = false
        },

        newItem: function (obj) {
    
            let oj = {
                'name': obj.key,
                'type': obj.type
            }
            if(obj.type === Types.ARRAY || obj.type === Types.OBJECT) {
                oj.childParams = obj.val
                oj.remark = null
            } else {
                oj.childParams = null
                oj.remark = obj.val
            }

            if(!oj.name) {
                alert('please must input a name!')
                return
            } else {

                this.parsedData.push(oj)
                this.$emit('input', this.parsedData)
                this.cancelNewItem()
            }
        },

        keyInputBlur: function (item, e) {
            if(item.name.length <= 0) {
                alert('please must input a name!')
                item.name = "null"
                e.target.focus()
                // return 1
            }
            console.debug(item)
            console.debug(e)
        },

        onChange: function() {
            this.$emit('change');
            this.$emit('input', this.parsedData)
        },
        changeText: function(item, newContent) {
            item.name = newContent;
            this.onChange();
        }

    }
}

</script>