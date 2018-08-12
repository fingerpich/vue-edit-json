<template>
    <div class="block_content">
        <span v-for="(item, index) in flowData" :key="index" :class="['block', 'clearfix', {'hide-block': hideMyBlock[index] === true}]">
            <span class="json-key">
                <span :contenteditable="isEdit" @blur="editItem"
                <input type="text" v-model="item.name" class="key-input" v-if="typeof item.name === Types.STRING" @blur="keyInputBlur(item, $event)">
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
                    <json-view :isEdit="isEdit" :parsedData="item.childParams" v-model="item.childParams" ></json-view>
                </template>

                <template v-else-if="item.type === Types.ARRAY">
                    <array-view :isEdit="isEdit" :parsedData="item.childParams" v-model="item.childParams" ></array-view>
                </template>

                <template v-else>
                    <span class="val">
                        <input type="text" v-model="item.remark" class="val-input" v-if="item.type === Types.STRING">
                        <input type="number" v-model.number="item.remark" class="val-input" v-if="item.type === Types.NUMBER">
                        <select name="value" v-model="item.remark" class="val-input" v-if="item.type === Types.BOOLEAN">
                            <option :value="true">true</option>
                            <option :value="false">false</option>
                        </select>
                    </span>
                </template>
            </span>
        </span>

        <item-add-form v-if="toAddItem" @confirm="newItem" @cancel="cancelNewItem"></item-add-form>

        <div v-if="isEdit" class="block add-key" @click="addItem" v-if="!toAddItem">
            <i class="icon-plus"></i>
        </div>
    </div>
</template>

<script>
import ItemAddForm from './ItemAddForm.vue'

const Types = {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object',
}
export default {
    name: 'JsonView',
    props: {'parsedData': {}, isEdit: true},
    data: function () {
        return {
            'flowData': [],
            'toAddItem': false,
            'hideMyBlock': {}
        }
    },

    created: function () {
        this.flowData = this.parsedData
    },

    components: {
        'item-add-form': ItemAddForm
    },
    methods: {
        'delItem': function (parentDom, item, index) {
            this.flowData = this.flowData.rmIndex(index)
            if(this.hideMyBlock[index]) this.hideMyBlock[index] = false
            this.$emit('input', this.flowData)
        },

        'closeBlock': function (index, e) {
            this.$set(this.hideMyBlock, index, !this.hideMyBlock[index])
        },

        'addItem': function () {
            this.toAddItem = true
        },

        'cancelNewItem': function () {
            this.toAddItem = false
        },

        'newItem': function (obj) {
    
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

                this.flowData.push(oj)
                this.$emit('input', this.flowData)
                this.cancelNewItem()
            }
        },

        'keyInputBlur': function (item, e) {
            if(item.name.length <= 0) {
                alert('please must input a name!')
                item.name = "null"
                e.target.focus()
                // return 1
            }
            console.debug(item)
            console.debug(e)
        }

        editItem(ev) {
            if (this.props.isEdit) {
                this.item.name = ev.target.textContent
            }
        }
    }
}

</script>