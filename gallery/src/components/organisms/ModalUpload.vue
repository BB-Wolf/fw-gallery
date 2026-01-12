<template>
    <div class="overlay-bg" v-show="isModalOpen.isModalUploadVisible" @click="closeModal"></div>
    <div id="login" class="modal" v-show="isModalOpen.isModalUploadVisible">
        <div class="modal-left-column">
            <div class="upload-zone" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                <input type="file" name="file" ref="file" @change="drop" accept=".gif,.webp, .jpg, .jpeg, .png">
                <div class="upload-header" v-if="!file">Перенесите изображение
                    <span class="upload-clicker" @click="$refs.file.click()">
                        или <b><u> нажмите здесь</u></b></span>
                </div>

                <div class="upload-image" v-if="file">
                    <img :src="file">
                </div>
            </div>
        </div>
        <div class="modal-right-column">

            <span class="close" @click="closeModal"></span>
            <div class="modal-title">
                <div class="h1">Загрузите Вашу работу</div>
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
                        <label>Описание</label>
                        <div class="muted">поддерживается Markdown разметка</div>
                        <textarea v-model="description" class="upload-description"></textarea>
                    </div>
                    <div class="new-upload-tags">
                        <label>Теги</label>
                        <div class="muted">Укажите теги через пробел</div>
                        <input type="text" v-model="tags" class="new-upload-item">
                    </div>
                    <div class="upload-character" @click="loadChars">
                        <div>
                            <label>Персонажи</label>
                            <Multiselect v-model="character" :options="characterOptions" :max=-1 />
                        </div>
                    </div>
                    <div class="upload-rate">
                        <div>
                            <label>Рейтинг</label>
                            <Multiselect v-model="rate" :options="rateOptions" />
                        </div>
                    </div>
                    <!-- <div class="upload-folder">
                        <div>
                            <label>Папка</label>
                            <Multiselect v-model="folder" :options="rateOptions" />
                        </div>
                    </div>-->
                </div>
                <button class="btn btn--info mt-20" @click="sendData">Отправить</button>

            </div>
            <div class="modal-foot" v-if="!this.sending">
            </div>
        </div>
    </div>
</template>

<script>
import { modalState } from '@main/state';
import Multiselect from '@vueform/multiselect'

import Tagify from '@yaireo/tagify'

import axios from 'axios';
export default {
    components: {
        Multiselect,
        Tagify
    },
    data() {
        return {
            isModalOpen: modalState,
            title: null,
            description: '',
            isDragging: false,
            file: this.rawFile,
            rawFile: null,
            rate: null,
            folder: null,
            rateOptions: [
                '0+',
                '16+',
                '18+',
            ],
            characterOptions: null,
            userFolder: null,
            tags: [],
            tag: '',
            selectItems: [],
            sending: false,
            responseData: null


        }
    },
    async mounted() {

        // let tagsList = await axios.get('//furry-world.ru/console/get_upload_tags.php');
        // // let inputElem = document.querySelector('.new-upload-item') // the 'input' element which will be transformed into a Tagify component
        // // let tagTagify = new Tagify(inputElem,
        // //     {
        // //         whitelist: tagsList.data,
        // //         dropdown: {
        // //             classname: "color-blue",
        // //             enabled: 1,              // show the dropdown immediately on focus
        // //             position: "text",         // place the dropdown near the typed text
        // //             closeOnSelect: false,          // keep the dropdown open after selecting a suggestion
        // //             searchKeys: ["text"] //  fuzzy-search matching for those whitelist items' properties

        // //         },
        // //     }
        // // );
    },
    methods:
    {
        async loadChars() {
            let charList = await axios.get('//furry-world.ru/console/get_user_characters.php', {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            if (charList.data) {
                this.characterOptions = charList.data;
            }
        },
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
            //    formData.append('folder', this.folder);
            let tagsList = document.querySelectorAll('tag');
            for (let i = 0; i < tagsList.length; i++) {
                this.tags[i] = tagsList[i].title;
                console.log(tagsList[i].title);
            }
            formData.append('tags', JSON.stringify(this.tags));
            formData.append('file', this.rawFile);
            const request = await axios.post('//furry-world.ru/console/post_image_create.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data) {
                this.responseData = request.data;
                if (request.data.status != 'success') {
                    setTimeout(() => this.sending = false, 3000);
                    setTimeout(() => this.responseData = null, 3000);
                } else {
                    modalState.isModalUploadVisible = false;
                }
            }
        },

        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        async drop(e) {
            e.preventDefault();
            var file = e.target.files || e.dataTransfer.files;
            this.isDragging = false;
            if (!file.length) {
                return;
            }
            this.rawFile = file[0];
            this.file = URL.createObjectURL(new File(file, file.name));
            let formData = new FormData();
            formData.append('file', this.rawFile);
            let request = await axios.post('//furry-world.ru/console/tools/post_tags_suggestions.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            console.log(request.data);
        },
        registerModal() {
            modalState.isModalLoginVisible = false;
            modalState.isModalRegisterVisible = false;

        },
        handleSelectedTag(tag) {
            this.tags.push(tag);
        },
        createNewTag() {
            for (let i = 0; i <= this.tags.length; i++) {
                if (this.tags[i]) {
                    if (this.tags[i].text != document.querySelector('.v3ti-new-tag').value) {
                        this.tags.push({ text: document.querySelector('.v3ti-new-tag').value.trim() });
                    } else {
                        document.querySelector('.v3ti-new-tag').value = '';
                    }
                }
            }
        },
        handleChangeTag(tags) {
            this.tags = tags;
        },
    }
}
</script>




