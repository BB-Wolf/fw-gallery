<template>
    <option :class="this.className" :value="this.optionValue">{{ this.optionText }}</option>
</template>

<script>
export default {
    props: ['className', 'optionValue', 'optionText']
}
</script>