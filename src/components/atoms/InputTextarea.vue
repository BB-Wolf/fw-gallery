<template>
    <label>{{ this.inputLabel }}</label>
    <textarea :name="this.inputName" :value="this.inputValue" :class="this.inputClass"></textarea>
</template>

<script>
export default {
    props: ['inputClass', 'inputName', 'inputValue', 'inputLabel']
}
</script>