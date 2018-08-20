<template>
    <div class="block_content array">
        <ol class="array-ol">
            <li v-for="(member, index) in parsedData" :key="index" :class="['array-item', {'hide-item': hideMyItem[index] == true}]">
                <p v-if="member.type !== 'object' && member.type !== Types.ARRAY">
                    <edit-value @change="change" :is-edit="isEdit" :item="member"></edit-value>
                </p>
                <div v-else>
                    <span :class="['json-key', 'json-desc']">{{member.type.toUpperCase()}}
                        <i class="collapse-down" v-if="member.type === Types.OBJECT || member.type === Types.ARRAY" @click="closeBlock(index, $event)">
                            <i class="icon-down-open"></i>
                        </i>
                        <i v-if="member.type === Types.OBJECT">{{'{' + member.childParams.length + '}'}}</i>
                        <i v-if="member.type === Types.ARRAY">{{'[' + member.childParams.length + ']'}}</i>
                    </span>   

                    <span class="json-val">         
                        <template v-if="member.type === Types.ARRAY">
                            <array-view @change="change" :isEdit="isEdit" :parsedData="member.childParams" v-model="member.childParams"></array-view>
                        </template>

                        <template v-if="member.type === Types.OBJECT">
                            <json-view @change="change" :is-edit="isEdit" :parsedData="member.childParams" v-model="member.childParams"></json-view>
                        </template>
                        
                    </span>        
                </div>
                
                <i v-if="isEdit" class="del-btn" @click="delItem(parsedData, member, index)">
                    <i class="icon-trash"></i>
                </i>
            </li>
        </ol>

        <item-add-form v-if="toAddItem" @confirm="newItem" @cancel="cancelNewItem" :needName="false"></item-add-form>

        <div class="block add-key" v-if="isEdit && !toAddItem" @click="addItem">
            <i class="icon-plus"></i>
        </div>
    </div>
</template>

<script>
import ItemAddForm from './ItemAddForm.vue';
import EditValue from "./EditValue.vue";
import JsonView from "./JsonView.vue";

const Types = {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object',
}

export default {
    name: 'ArrayView',
    props: {parsedData: {}, isEdit: true},
    data: function() {
        return {
            'toAddItem': false,
            Types: Types,
            'hideMyItem': {}
        }
    },
    components: {
        JsonView,
        EditValue,
        'item-add-form': ItemAddForm
    },
    methods: {
        delItem: function (parentDom, item, index) {
            this.parsedData = this.parsedData.rmIndex(index)
            if(this.hideMyItem[index])  this.hideMyItem[index] = false
            this.$emit('input', this.parsedData)
        },

        addItem: function () {
            this.toAddItem = true
        },

        cancelNewItem: function () {
            this.toAddItem = false
        },

        closeBlock: function (index, e) {
            this.$set(this.hideMyItem, index, !this.hideMyItem[index])
        },

        newItem: function (obj) {
            this.toAddItem = false;
    
            let oj = {
                name: obj.key,
                type: obj.type
            };
            if(obj.type === Types.ARRAY || obj.type === Types.OBJECT) {
                oj.childParams = obj.val;
                oj.remark = null
            } else {
                oj.childParams = null;
                oj.remark = obj.val;
            }

            this.parsedData.push(oj);
            this.change();
            this.cancelNewItem();
        },
        change: function() {
            this.$emit('change', this.parsedData)
        },
        onEdit: function(e) {

        }
    }
}

</script>
