<template>
    <div class="overlay-bg" v-show="isModalOpen.isModalUploadVisible" @click="closeModal"></div>
    <div id="login" class="modal" v-show="isModalOpen.isModalUploadVisible">
        <div class="modal-left-column">
            <div class="upload-zone" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                <input type="file" name="file" ref="file" accept=".gif,.webp, .jpg, .jpeg, .png">
                <div class="upload-header" v-if="!file">Перенесите изображение сюда</div>
                <div class="upload-image" v-if="file">
                    <img :src="file">
                </div>
            </div>
        </div>
        <div class="modal-right-column">

            <span class="close" @click="closeModal"></span>
            <div class="modal-title">
                <div class="h1" style="color:black">Загрузите Вашу работу</div>
            </div>
            <div class="modal-body">
                <div class="wait-container" v-if="this.sending">
                    <div class="lds-roller" v-if="!this.responseData">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="response" v-if="this.responseData">
                        {{ this.responseData.text }}
                    </div>
                </div>
                <div class="upload-container" v-if="!this.sending">
                    <div class="upload-title">
                        <label>Заголовок</label>
                        <input type="text" v-model="title">
                    </div>
                    <div class="upload-description">
                        <label>Описание (поддерживается Markdown разметка)</label>
                        <textarea v-model="description" class="upload-description"></textarea>
                    </div>
                    <div class="upload-tags">
                        <label>Теги</label>
                        <vue3-tags-input v-model:tags="tags" v-model="tag" :select="true" :select-items="selectItems"
                            @on-select="handleSelectedTag" @on-tags-changed="handleChangeTag"
                            @keyup.space="createNewTag" placeholder="Select the tag">
                            <template #item="{ tag, index }">
                                {{ tag.text }}
                            </template>
                            <template #no-data>
                                No Data
                            </template>
                            <template #select-item="tag">
                                {{ tag.text }}
                            </template>
                        </vue3-tags-input>
                    </div>
                    <div class="upload-rate">
                        <div>
                            <label>Рейтинг</label>
                            <Multiselect v-model="rate" :options="rateOptions" />
                        </div>
                    </div>
                    <div class="upload-folder">
                        <div>
                            <label>Папка</label>
                            <Multiselect v-model="folder" :options="rateOptions" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-foot" v-if="!this.sending">
                <button class="button-53" @click="sendData">Отправить</button>
            </div>
        </div>
    </div>
</template>

<script>
import { modalState } from '../../state';
import Multiselect from '@vueform/multiselect'
import Vue3TagsInput from 'vue3-tags-input';

import axios from 'axios';
export default {
    components: {
        Multiselect,
        Vue3TagsInput
    },
    data() {
        return {
            isModalOpen: modalState,
            title: null,
            description: null,
            isDragging: false,
            file: this.rawFile,
            rawFile: null,
            rate: null,
            folder: null,
            rateOptions: [
                'Clean',
                '16+',
                '18+',
            ],
            userFolder: null,
            tags: [],
            tag: '',
            selectItems: [],
            sending: false,
            responseData: null


        }
    },
    async created() {
        // const mainTagsReq = await axios.get(`//img-fw.bb-wolf.site/console/get_upload_tags.php`, {
        // });
        // const [mainTags] = await Promise.all([mainTagsReq]);

        // if (mainTags.data) {
        //     this.selectItems = mainTags.data;
        // }
    },
    methods:
    {
        closeModal() {
            this.isModalOpen.isModalUploadVisible = false;
        },
        createBase64Image(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.rawFile = e.target.result;
            };
            reader.readAsDataURL(fileObject);
        },
        async sendData() {
            this.sending = true;
            var formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('rate', this.rate);
            formData.append('folder', this.folder);
            formData.append('tags', JSON.stringify(this.tags));
            formData.append('file', this.rawFile);
            const request = await axios.post('//img-fw.bb-wolf.site/console/post_image_create.php', formData, {
            });
            if (request.data) {
                this.responseData = request.data;
            }
        },

        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            var file = e.target.files || e.dataTransfer.files;
            this.isDragging = false;
            if (!file.length) {
                return;
            }
            this.rawFile = file[0];
            this.file = URL.createObjectURL(new File(file, file.name));
        },
        registerModal() {
            modalState.isModalLoginVisible = false;
            modalState.isModalRegisterVisible = false;

        }, handleSelectedTag(tag) {
            this.tags.push(tag);
        },
        createNewTag() {
            this.tags.push({ text: document.querySelector('.v3ti-new-tag').value });
        },
        handleChangeTag(tags) {
            this.tags = tags;
        },
    }
}
</script>


<style scoped>
input[type='text'],
textarea {
    background-color: #fff;
    color: #000;

}

.upload-container {
    width: 100%;
    padding: 0px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
    justify-content: space-around;
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

.overlay-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
}

#login {
    max-width: 1200px;
    max-height: 700px;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    display: flex;
    background-color: white;
    flex-direction: row;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.3);
    z-index: 999999;
    transition: transform 0.3s;
}

.modal-left-column {
    max-width: 500px;
    width: 100%;
    background-size: cover;

}

.modal-right-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 700px;
    width: 100%;
    align-items: first baseline;
    padding-left: 50px;
}


.modal-right-column .h1 {
    font-size: 26px;
    font-weight: 700;
    padding-top: 20px;
    text-align: left;
}



.modal-right-column input {
    padding: 20px;
    width: 100%;
}


.modal-right-column .modal-body {
    width: 100%;
    padding: 0 40px 0px 0px;
    height: 100%;
}

.form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;

}

.form-group label {
    font-size: 18px;
    font-weight: 600;
}


/* CSS */
.button-53 {
    background-color: #3DD1E7;
    border: 0 solid #E5E7EB;
    box-sizing: border-box;
    color: #000000;
    display: flex;
    font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 700;
    justify-content: center;
    line-height: 1.75rem;
    padding: .75rem 1.65rem;
    position: relative;
    text-align: center;
    text-decoration: none #000000 solid;
    text-decoration-thickness: auto;
    width: 100%;
    max-width: 610px;
    position: relative;
    cursor: pointer;
    transform: rotate(-2deg);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-53:focus {
    outline: 0;
}

.button-53:after {
    content: '';
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
}

.button-53:hover:after {
    bottom: 2px;
    left: 2px;
}

@media (min-width: 768px) {
    .button-53 {
        padding: .75rem 3rem;
        font-size: 1.25rem;
    }
}

@media(max-width:768px) {
    .modal-left-column {
        display: none;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.shake-form {
    animation-duration: 0.2s;
    animation-name: shake;
}

@keyframes shake {
    0% {
        transform: translate(-50%, -50%);
    }

    50% {
        transform: translate(-45%, -50%);
    }

    100% {
        transform: translate(-55%, -50%);
    }
}

.close {
    cursor: pointer;

}

.close:after,
.close:before {
    content: "";
    height: 0px;
    width: 20px;
    border-top: 1px solid #000;
    position: absolute;
    top: 40px;
    right: 32px;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    border: 1px solid black;
    border-radius: 50%;
}

.close:before {
    right: 32px;
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.close:hover {
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=30);
    opacity: 0.3;
}

.lds-roller,
.lds-roller div,
.lds-roller div:after {
    box-sizing: border-box;
}

.lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}

.lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7.2px;
    height: 7.2px;
    border-radius: 50%;
    background: currentColor;
    margin: -3.6px 0 0 -3.6px;
}

.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
    top: 62.62742px;
    left: 62.62742px;
}

.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
    top: 67.71281px;
    left: 56px;
}

.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
    top: 70.90963px;
    left: 48.28221px;
}

.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}

.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
    top: 70.90963px;
    left: 31.71779px;
}

.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
    top: 67.71281px;
    left: 24px;
}

.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
    top: 62.62742px;
    left: 17.37258px;
}

.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12.28719px;
}

@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.wait-container {
    display: flex;
    justify-content: center;
    height: 90%;
    align-items: center;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>
