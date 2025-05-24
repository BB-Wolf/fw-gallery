<template>
    <div class="overlay-bg" v-show="isModalOpen.isModalUploadVisible" @click="closeModal"></div>
    <div id="login" class="modal" v-show="isModalOpen.isModalUploadVisible">
        <div class="modal-wrapper">
            <div class="modal-body">
                <div class="modal-left">
                    <div class="body-item" @click="console.log(this.rawFile)">
                        <UploadImage v-model="rawFile"></UploadImage>
                    </div>
                </div>
                <div class="modal-body modal-right" v-show="this.activeTab == 1">
                    <div class="modal-title mt-10">
                        <div class="h1">Добавление работы</div>
                        <div class="muted mb-20">Шаг 1</div>
                    </div>
                    <ModalTitle v-model="title"></ModalTitle>
                    <ModalDescription v-model="description"></ModalDescription>
                </div>
                <div class="modal-body modal-right" v-show="this.activeTab == 2">
                    <div class="modal-title mt-10">
                        <div class="h1">Добавление работы</div>
                        <div class="muted mb-20">Шаг 2</div>
                    </div>
                    <ModalRate v-model="this.rate"></ModalRate>
                    <ModalTags v-model="this.tags"></ModalTags>
                    <ModalFolders v-model="this.folder"></ModalFolders>
                </div>
                <div class="modal-body modal-right" v-show="this.activeTab == 3">
                    <div class="modal-title mt-10">
                        <div class="h1">Добавление работы</div>
                        <div class="muted mb-20">Шаг 3</div>
                        <ModalCharacters v-model="this.chars"></ModalCharacters>
                    </div>
                    <div class="mt-20 btn btn--success" @click="sendData">Сохранить</div>
                </div>
            </div>
            <div class="booklets">
                <div class="booklet-item booklet-item--active" @click="setBookletActive($event)" data-tab="1">1</div>
                <div class="booklet-item" @click="setBookletActive($event)" data-tab="2">2</div>
                <div class="booklet-item" @click="setBookletActive($event)" data-tab="3">3</div>
            </div>
        </div>
    </div>

</template>
<script>

import UploadImage from '@gallery/components/molecules/UploadImage.vue';
import ModalTitle from '@gallery/components/molecules/ModalTitle.vue';
import ModalDescription from '@gallery/components/molecules/ModalDescription.vue';
import ModalRate from '@gallery/components/molecules/ModalRate.vue';
import ModalTags from '@gallery/components/molecules/ModalTags.vue';
import ModalFolders from '@gallery/components/molecules/ModalFolders.vue';
import ModalCharacters from '@gallery/components/molecules/ModalCharacters.vue';
import axios from 'axios';
import { modalState } from '@main/state';

export default {
    components:
    {
        UploadImage,
        ModalRate,
        ModalTitle,
        ModalDescription,
        ModalTags,
        ModalFolders,
        ModalCharacters,
    },
    data() {
        return {
            file: null,
            rawFile: null,
            rate: null,
            title: '',
            description: '',
            activeTab: 1,
            tags: null,
            folder: '',
            chars: '',
            isModalOpen: modalState,

        }
    },
    methods:
    {
        setActive(e) {
            console.log(e);
            let bookletItems = document.querySelectorAll('.booklet-item');
            for (let i = 0; i < bookletItems.length; i++) {
                bookletItems[i].classList.remove('booklet-item--active')
            }
            if (e.currentTarget) {
                e.currentTarget.classList.add('booklet-item--active');
            } else {
                e.classList.add('booklet-item--active');
            }

        },
        setBookletActive(evt) {
            this.activeTab = evt.currentTarget.dataset.tab;
        },
        closeModal() {
            this.isModalOpen.isModalUploadVisible = false;
        },
        //todo  -rewrite tab switch. use state instead of direct search. use class for modal and tablet
        async sendData() {
            if (this.title == '') {
                this.activeTab = 1;
                let titleObj = document.querySelector('.title-input');
                titleObj.classList.add('error');
                let booklet = document.querySelectorAll('.booklet-item');
                this.setActive(booklet[0]);
                return;
            }
            if (this.rawFile == null) {
                let uplObj = document.querySelector('.upload-zone');
                uplObj.classList.add('error');
                return;
            }
            if (this.rate == '') {
                this.activeTab = 2;
                let rateObj = document.querySelector('.upload-rate .multiselect');
                let booklet = document.querySelectorAll('.booklet-item');
                this.setActive(booklet[1]);
                rateObj.classList.add('error');
                return;
            }
            this.sending = true;
            var formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('rate', this.rate);
            formData.append('folder', this.folder);
            formData.append('tags', this.tags);
            formData.append('file', this.rawFile);
            formData.append('chars', JSON.stringify(this.chars));
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
    },
    mounted() {
        let bookletItems = document.querySelectorAll('.booklet-item');
        for (let i = 0; i < bookletItems.length; i++) {
            bookletItems[i].addEventListener('click', this.setActive, false);
        }
    }
}
</script>
<style scoped>
textarea {
    min-height: 200px;
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
    max-width: 70vw;
    max-height: 85vh;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    display: flex;
    background-color: #2b2b2b;
    color: #d9d9d9;
    flex-direction: row;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    transition: transform 0.3s;
}

.modal-wrapper {
    display: flex;
    width: 100%;
}

.modal-body {
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: #2b2b2b;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
}

.modal-left {
    width: 40%;
}

.modal-right {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
}

.body-item {
    height: 100%;
}

.booklets {
    position: absolute;
    right: -60px;
    display: flex;
    z-index: 9999;
    flex-direction: column;
    gap: 1rem;
    width: 70px;
}

.booklet-item {
    width: 60px;
    height: 80px;
    color: white;
    text-align: center;
    background-color: #2b2b2b;
    left: 10px;
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-size: 32px;
    align-content: center;
}

.booklet-item--active {
    transform: scale(1.1);
    align-self: safe center;
    top: 4px;
    position: relative;
    box-shadow: inset 0px 0px 0px 2px rgba(255, 255, 255, 0.7);
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-weight: bold;

}

.error {
    border: 2px solid red !important;
}

.multiselect-wrapper {
    background-color: #2b2b2b;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>
