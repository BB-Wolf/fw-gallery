<template>
    <div class="switch">
        <label>{{ this.inputLabel }}</label>
        <span class="switch-off">Нет</span>
        <input class="toggle-checkbox" @change="setValue($event)" ref="swtch" type="checkbox" :name="this.inputName"
            :checked="this.isChecked">
        <div class="toggle-container" @click="this.$refs.swtch.click()">
            <div class="toggle-button">
                <div class="toggle-button-circles-container">
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                </div>
            </div>
        </div>
        <span class="switch-on">Да</span>
    </div>
</template>
<script>
export default
    {
        props: ['inputLabel', 'inputName', 'isChecked'],
        methods:
        {
            setValue(evt) {
                this.$emit('update:modelValue', evt.target.value)
            }
        }
    }
</script>
