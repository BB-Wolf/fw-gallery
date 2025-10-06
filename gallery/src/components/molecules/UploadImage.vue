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
            this.previewFileImg = URL.createObjectURL(new File(file, file.name));
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
<style>
.upload-container {
    width: 100%;
    padding: 0px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 10px;
    justify-content: space-around;
}

.upload-clicker {
    text-decoration: underline 1px #000;
    cursor: pointer;
}

.upload-zone input[type="file"] {
    display: none;
}

.upload-container textarea {
    width: 100%;
    min-height: 80px;
    padding: 20px;
}

.upload-container label {
    font-weight: 700;
    font-weight: bold;
}

.upload-image img {
    max-width: 320px;
}

.upload-container select {
    padding: 20px;
}

.upload-zone {
    border: 4px dashed rgb(89, 236, 255);
    display: flex;
    max-width: 95%;
    height: 95%;
    margin: 20px auto;
    align-items: center;
    padding: 20px;
    justify-content: center;
}

.upload-zone::before {
    content: '';
    width: 40px;
    height: 40px;
    display: block;
    background: url('../../assets/icons/upload-file.svg');
}
</style>