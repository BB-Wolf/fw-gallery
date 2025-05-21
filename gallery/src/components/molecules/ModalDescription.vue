<template>
    <div class="upload-description">
        <label>Описание</label>
        <div class="muted">поддерживается Markdown разметка</div>
        <textarea @change="$emit('update:modelValue', $event.target.value)" class="upload-description"></textarea>
    </div>
</template>