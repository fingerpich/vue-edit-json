<template>
    <span :contenteditable="isEdit" @keydown="keydown" @blur="editItem">{{value}}>
    </span>
</template>

<script>

export default {
    name: 'EditableText',
    props: {value: '', isEdit: true},
    data: function () {
        return {
        }
    },
    methods: {
        keydown: function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.editItem(e);
            }
        },
        editItem: function (ev) {
            if (this.isEdit) {
                console.log(ev.target.textContent);
                this.$emit('change', ev.target.textContent)
            }
        }
    }
}
</script>