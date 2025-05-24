<template>
    <div class="upload-title">
        <label>Заголовок</label>
        <input type="text" class="title-input" @click="removeError($event)"
            @change="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script>
export default
    {
        methods:
        {
            removeError(evt) {
                if (evt.currentTarget.classList.contains('error')) {
                    evt.currentTarget.classList.remove('error');
                }
            }
        }
    }
</script>