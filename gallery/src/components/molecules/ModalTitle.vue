<template>
    <div class="upload-title">
        <label>Заголовок</label>
        <input type="text" @change="$emit('update:modelValue', $event.target.value)">
    </div>
</template>