<template>
    <div class="upload-zone" @dragover="dragover" @dragleave="dragleave" @drop="drop">
        <input type="file" name="file" ref="file" @change="drop" accept=".gif,.webp, .jpg, .jpeg, .png">
        <div class="upload-header" v-if="!previewFileImg">Перенесите изображение
            <span class="upload-clicker" @click="$refs.file.click()">
                или <b><u> нажмите здесь</u></b></span>
        </div>

        <div class="upload-image" v-if="previewFileImg">
            <img @click="$refs.file.click()" :src="previewFileImg">
        </div>
    </div>
</template>
<script>
export default {
    props: ['file', 'rawFile'],
    defineEmits: ['update:modelValue'],
    data() {
        return {
            previewFile: null,
            previewFileImg: null,
            isDragging: false,
        }
    },
    methods:
    {
        drop(e) {
            e.preventDefault();
            var file = e.target.files || e.dataTransfer.files;
            this.isDragging = false;
            if (!file.length) {
                return;
            }
            this.previewFile = file[0];
            this.previewFileImg = URL.createObjectURL(this.previewFile);
            this.$emit('update:modelValue', this.previewFile);
        }, dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
    }
}
</script>
