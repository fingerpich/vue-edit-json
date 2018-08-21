<template>
  <div class="add-form pure-form">
    <form @submit="confirm">
      <div class="f-input">
        <input type="text" v-model="keyName" class="f-input-m" placeholder="name" v-if="needName">
        <select v-model="formatSelected" class="f-input-m">
            <option :value="item" v-for="(item, index) in formats" :key="item">{{item}}</option>
        </select>
        <span class="f-input-m"><b>:</b></span>

        <!-- -- -->
        <template v-if="formatSelected !='array' && formatSelected != 'object'">
            <input type="text" v-model="valName" class="f-input-m" placeholder="value" v-if="formatSelected == 'string'">
            <input type="number" v-model="valName" class="f-input-m" placeholder="value" v-if="formatSelected == 'number'" @change="dealNumber">
            <select name="value" v-model="valName" class="f-input-m" v-if="formatSelected == 'boolean'" @change="dealBoolean">
                <option :value="true">true</option>
                <option :value="false">false</option>
            </select>
        </template>
      </div>

      <!-- -- -->
      <div class="f-btns">
        <button type="submit" class="pure-button f-confirm">add</button>
        <button type="button" class="pure-button" @click="cancel">cancel</button>
      </div>
    </form>
  </div>

</template>

<script>
export default {
    name: "ItemAddForm",
    data: function() {
        return {
            formats: ["string", "array", "object", "number", "boolean"],
            formatSelected: "string",
            //--
            keyName: "",
            valName: ""
        };
    },
    props: {
        needName: {
            default: true
        }
    },
    methods: {
        confirm: function(e) {
            e.preventDefault();
            let val = null;
            if (
                this.formatSelected === "array" ||
                this.formatSelected === "object"
            ) {
                val = [];
            } else {
                val = this.valName;
            }

            let objData = {
                key: this.needName ? this.keyName : null,
                val: val,
                type: this.formatSelected
            };

            this.$emit("confirm", objData);
            this.keyName = "";
            this.valName = "";
            this.formatSelected = "string";
        },

        cancel: function(e) {
            e.preventDefault();
            this.$emit("cancel");
        },

        dealBoolean: function() {
            this.valName = Boolean(this.valName);
        },

        dealNumber: function() {
            this.valName = Number(this.valName);
        }
    }
};
</script>

<style scoped>
    .f-input, .f-btns {
        display: inline-block;
    }

    .f-btns {
        display: inline-block;
        margin: 0 0 0 3px;
    }

    .add-form {
        margin-bottom: 20px;
        font-size: 0.9rem;
    }
    .add-form input, .add-form select, .add-form button{
        font-size: 0.9rem;
        height: 2rem;
        box-sizing: content-box;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        padding: 0 7px;
    }
    .add-form input, .add-form select{
        width: 70px;
        border: 1px solid #dddddd;
    }

    .f-confirm {
        color: #fff;
        padding: 24px;
        background: #4498ff;
    }

</style>