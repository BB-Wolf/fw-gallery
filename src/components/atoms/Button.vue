<template>
    <button v-bind:class="this.buttonClass"> {{ this.buttonValue }}</button>
</template>

<script>
export default {
 props: ['buttonValue','buttonClass']
}
</script>