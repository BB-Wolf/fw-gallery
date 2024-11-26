<template>
    <select :class="this.className">
        <Option v-for="item in items" :class="item.className" :value="item.message" :text="item.Text"></Option>
    </select>
</template>

<script>
import Option from "../atoms/Option.vue";

export default {
    props: {
        className: String,
        options: Array
    },
    data() {
        return {
            items: [{ message: 'Foo' }, { message: 'Bar' }]
        }
    }

}
</script>