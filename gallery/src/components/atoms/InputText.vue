<template>
    <label>{{ this.inputLabel }}</label>
    <span class="muted">Оставьте поле пустым для удаления</span>
    <input type="text" :name="this.inputName" :value="this.inputValue" :class="this.inputClass">
</template>

<script>
export default {
    props: ['inputClass', 'inputName', 'inputValue', 'inputLabel']
}
</script>
