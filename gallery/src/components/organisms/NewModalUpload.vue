<template>
    <div class="overlay-bg" v-show="isModalOpen.isModalUploadVisible" @click="closeModal"></div>
    <AutosaveModal v-if="this.showActionModal" :saveText="'Сохраняем...'"></AutosaveModal>
    <div id="upload-modal" class="modal" v-show="isModalOpen.isModalUploadVisible">
        <div class="modal-wrapper">
            <div class="modal-body">
                <div class="modal-left">
                    <div class="body-item" @click="console.log(this.rawFile)">
                        <UploadImage v-model="rawFile" @change="this.setSuggestionTags()"></UploadImage>
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
                    <ModalTags v-model="this.tags" :suggestedTags="this.suggestedTags"></ModalTags>
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

import { modalState } from '@main/state';
import UploadImage from '@gallery/components/molecules/UploadImage.vue';
import ModalTitle from '@gallery/components/molecules/ModalTitle.vue';
import ModalDescription from '@gallery/components/molecules/ModalDescription.vue';
import ModalRate from '@gallery/components/molecules/ModalRate.vue';
import ModalTags from '@gallery/components/molecules/ModalTags.vue';
import ModalFolders from '@gallery/components/molecules/ModalFolders.vue';
import ModalCharacters from '@gallery/components/molecules/ModalCharacters.vue';
import axios from 'axios';
import AutosaveModal from '@gallery/components/molecules/AutosaveModal.vue';

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
        AutosaveModal
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
            showActionModal: false,
            suggestedTags: null,
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
        async setSuggestionTags() {
            let formData = new FormData();
            formData.append('file', this.rawFile);
            let request = await axios.post('//furry-world.ru/console/tools/post_tags_suggestions.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data) {
                this.suggestedTags = request.data.suggestions;
            }
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
            this.showActionModal = true;
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
            this.showActionModal = false;
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
