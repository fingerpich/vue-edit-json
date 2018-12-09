<template>
    <json-view :isEdit="isEdit" :parsedData="parsedData" @input="jsonChangedData"></json-view>
</template>


<script>
import JsonView from "./JsonView.vue";
export default {
    name: 'JsonEditor',
    components: {JsonView},
    props: { value: Object , isEdit: true},
    data: function() {
        return {
            parsedData: [],
        }
    },
    created: function() {
        this.parsedData = this.jsonParse(this.value);
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                if (newValue!==oldValue) {
                    this.parsedData = this.jsonParse(newValue);
                }
　　　　　　  },
　　　　    deep: true
　　　　}
    },
    methods: {
        jsonChangedData: function(data) {
            // console.log('jsonView has changed', data);
            this.$emit('input', this.makeJson(data))
        },
        jsonParse: function (jsonStr) {
            let parseJson = (json) => {
                let result = []
                let keys = Object.keys(json)
                keys.forEach((k, index) => {
                    let val = json[k]
                    let parsedVal = val
                    if(this.getType(val) === 'object') {
                        parsedVal = parseJson(val)

                    } else if(this.getType(val) === 'array') {
                        parsedVal = parseArray(val)
                    }

                    let opt = {
                        'name': k,
                        'type': this.getType(val)
                    }

                    if(opt.type === 'array' || opt.type === 'object') {
                        opt.childParams = parsedVal
                        opt.remark = null
                    } else {
                        opt.childParams = null
                        opt.remark = parsedVal
                    }
                     
                    result.push(opt)    
                })
                return result
            }

            //
            let parseArray = (arrayObj) => {
                let result = []
                for (let i = 0; i < arrayObj.length; ++i) {
                    let val = arrayObj[i]
                    let parsedVal = val
                    if (this.getType(val) === 'object') {
                        parsedVal = parseJson(val)

                    } else if (this.getType(val) === 'array') {
                        parsedVal = parseArray(val)
                    }


                    let opt = {
                        'name': null,
                        'type': this.getType(val)
                    }

                    if(opt.type === 'array' || opt.type === 'object') {
                        opt.childParams = parsedVal
                        opt.remark = null
                    } else {
                        opt.childParams = null
                        opt.remark = parsedVal
                    }

                    result.push(opt)        
                }
                return result
            }

            // --
            let parseBody = (json) => {
                let r = parseJson(json)
                return r
            }

            return parseBody(jsonStr)
        },

        getType: function(obj) {
            switch (Object.prototype.toString.call(obj)) {
                case '[object Array]': 
                    return 'array'
                    break
                case '[object Object]':
                    return 'object'
                    break
                default:
                    return typeof(obj)
                    break
            } 
        },

        makeJson: function (dataArr) {

            let revertWithObj = function(data) {
                let r = {}
                for(let i = 0; i < data.length; ++i) {
                    let el = data[i]
                    let key, val
                    key = el.name
                    if(el.type == 'array') {
                        val = revertWithArray(el.childParams)

                    } else if (el.type == 'object') {
                        val = revertWithObj(el.childParams)

                    } else {
                        val = el.remark
                    }

                    r[key] = val
                }
                return r
            }

            let revertWithArray = function(data) {
                let arr = []
                for(let i = 0; i < data.length; ++i) {
                    let el = data[i]
                    let r
                    if(el.type == 'array') {
                        r = revertWithArray(el.childParams)

                    } else if (el.type == 'object') {
                        r = revertWithObj(el.childParams)

                    } else {
                        r = el.remark
                    }
                    
                    arr.push(r)
                }
                return arr
            }

            let revertMain = function (data) {
                let r = revertWithObj(data)
                return r
            } 

            return revertMain(dataArr)
        }
    }
}

</script>

<style >
    @import "assets/styles/fontello.css";
    .block {
        position: relative;
        display: block;
        line-height: 30px;
    }
    .block.hide-block {
        background: #f5f5f5;
    }
    .block.hide-block .json-val {
        display: none;
    }
    .block.hide-block .collapse-down {
        transform: rotate(-90deg);
    }
    .del-btn {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99999999999999;
        cursor: pointer;
        transition: opacity .4s ease;
    }
    .del-btn:hover {
        opacity: .6;
    }
    .des {
        position: absolute;
        right: 14px;
        font-size: 10px;
        line-height: 30px;
        color: #6190e8;
        cursor: pointer;
    }
    .add-des {
        color: #999;
    }
    .block_content {
        text-align: left;
        margin-left: 30px;
        line-height: 1.5 !important;
    }
    .block_content .i-type {
        color: #999;
    }
    .block_content .key-input,
    .block_content .val-input {
        width: 140px;
        border: none;
        height: 25px;
        padding: 0 5px;
        font-weight: bold;
        font-size: 14px;
        background: rgba(0, 0, 0, 0);
    }
    .block_content .key-input:focus,
    .block_content .val-input:focus {
        background: #ffffa0;
        border: none;
        outline: 0;
    }
    .block_content .val-input {
        font-weight: normal;
        color: #0b8e6b;
    }
    .block_content .json-key {
        font-weight: bold;
    }
    .block_content .json-key.json-desc {
        color: #999;
        font-size: .8em;
    }
    .collopsed:before {
        content: '';
        display: inline-block;
        height: 10px;
        width: 10px;
        background: #333;
    }
    .collapse-down {
        float: left;
        margin-top: 2px;
        margin-right: 2px;
        color: #000;
        cursor: pointer;
        transition: transform .2s ease;
    }
    .add-key {
        display: inline-block;
        padding-left: 2px;
        padding-right: 2px;
        margin-bottom: 10px;
        font-size: .8em;
        line-height: 1em;
        cursor: pointer;
    }
    .array-ol {
        padding-left: 20px !important;
    }
    .array-item {
        position: relative;
    }
    .array-item.hide-item {
        background: #f5f5f5;
    }
    .array-item.hide-item .json-val {
        display: none;
    }
    .array-item.hide-item .collapse-down {
        transform: rotate(-90deg);
    }

</style>
