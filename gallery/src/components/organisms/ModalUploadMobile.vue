<template>
    <div class="steps" v-show="isModalOpen.isModalMobileUploadVisible">
        <div class="steps-container">
            <form id="mobileUpload">
                <!-- Step 1-->
                <div class="step-item" v-if="this.step == 1">
                    <div class="h2">Загрузка изображения</div>
                    <div class="steps-image__peview" v-if="image">
                        <img :src="this.image">
                    </div>
                    <div class="form-group">
                        <ModalTitle v-model="title"></ModalTitle>
                    </div>
                    <div class="form-group">
                        <label>Изображение</label>
                        <input type="file" style="display: none;" ref="file" name="file" @change="makePreview">
                        <div class="btn btn--default" style="width:100%;" @click="this.$refs.file.click()">Загрузить
                            изображение
                        </div>
                    </div>
                    <div class="form-group f-align__end">
                        <div class="btn btn--info step--next" @click="nextStep">Вперед</div>
                    </div>
                </div>
                <!-- End of step1-->
                <!-- Step 2-->
                <div class="step-item" v-if="this.step == 2">
                    <div class="form-group">
                        <ModalDescription v-model="description"></ModalDescription>

                    </div>
                    <div class="form-group f-row f-space__between">
                        <div class="btn btn--primary step--prev" @click="prevStep">Назад</div>
                        <div class="btn btn--info step--next" @click="nextStep">Вперед</div>
                    </div>
                </div>

                <div class="step-item" v-if="this.step == 3">
                    <div class="form-group">
                        <ModalTags v-model="this.tags"></ModalTags>
                    </div>
                    <div class="form-group">
                        <ModalFolders v-model="this.folder"></ModalFolders>
                    </div>
                    <div class="form-group">
                        <ModalRate v-model="this.rate"></ModalRate>
                    </div>
                    <div class="form-group f-row f-space__between">
                        <div class="btn btn--primary step--prev" @click="prevStep">Назад</div>
                        <div class="btn btn--info step--next" @click="nextStep">Вперед</div>
                    </div>
                </div>

                <div class="step-item" v-if="this.step == 4">
                    <div class="h2">Предпросмотр</div>
                    <div class="form-group">
                        <div>{{ title }}</div>
                    </div>
                    <div class="form-group">
                        <div class="steps-image__peview" v-if="image">
                            <img :src="this.image">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="">Рейтинг</label>
                        <div>{{ this.rate }}</div>
                    </div>
                    <div class="form-group" style="display: flex; flex-wrap: wrap; flex-direction: row; gap:20px;">
                        <label>Теги</label>
                        <div class="btn btn--default" v-for="tag in JSON.parse(tags)" :key="tag">
                            {{ tag.value }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Папка</label>
                        <div> {{ this.folder }}</div>
                    </div>
                    <div class="form-group f-row f-space__between">
                        <div class="btn btn--primary step--prev" @click="prevStep">Назад</div>
                        <div class="btn btn--success step--next" @click="finishStep">Загрузить</div>
                    </div>
                </div>
                <!-- End of step2-->
            </form>
            <div class="form-group">
                <div class="btn btn--full_width btn--danger" @click="exitModal">Закрыть</div>
            </div>
        </div>
    </div>
</template>
<style>
.upload-title {
    display: flex;
    flex-direction: column;
}

textarea {
    width: 100%;
    min-height: 120px;
}

.steps {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #2b2b2b;
    display: flex;
    flex-direction: column;
    gap: 20px;
    row-gap: 20px;
    justify-content: space-between;
    z-index: 9999;
}

.steps .btn {
    text-align: center;
    margin-bottom: 20px;
    width: 140px;
}

.steps .btn--full_width {
    width: 100%;
}


.step-item {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.step-item input[type="text"] {
    padding: 10px;
    font-size: 18px;
    font-weight: 700;
    font-style: italic;
}

.steps-container {
    padding: 10px 15px;
}

.steps-container .form-group {
    color: white;
    display: flex;
    flex-direction: column;
}

.f-row {
    flex-direction: row !important;
}

.f-space__between {
    justify-content: space-between;
}

.f-align__end {
    align-items: flex-end;
}


.steps-container .form-group label {
    font-size: 18px;
}

.steps-container .steps-image__peview {
    width: 100%;
    max-width: 140px;
    margin: 0 auto;
}

.steps-container .steps-image__peview img {
    max-width: 100%;
    object-fit: contain;
    box-sizing: border-box;
}

.multiselect-option span,
.multiselect-single-label-text {
    color: black;
}
</style>
<script>
import Multiselect from '@vueform/multiselect'
import { modalState, notifications } from '@main/state.js';
import axios from 'axios';
import ModalTitle from '@gallery/components/molecules/ModalTitle.vue';
import ModalDescription from '@gallery/components/molecules/ModalDescription.vue';
import ModalRate from '@gallery/components/molecules/ModalRate.vue';
import ModalTags from '@gallery/components/molecules/ModalTags.vue';
import ModalFolders from '@gallery/components/molecules/ModalFolders.vue';
import ModalCharacters from '@gallery/components/molecules/ModalCharacters.vue';

export default {
    components:
    {
        Multiselect,
        ModalRate,
        ModalTitle,
        ModalDescription,
        ModalTags,
        ModalFolders,
        ModalCharacters,
    },
    data() {
        return {
            isModalOpen: modalState,
            stepsTotal: null,
            step: 1,
            image: null,
            imageRaw: null,
            title: null,
            description: '',
            tags: null,
            folder: null,
            rate: null,
            rateOptions: [
                'Clean',
                '16+',
                '18+',
            ],
            sending: false,
            activeTab: 1,
            chars: '',

        }
    },
    methods:
    {
        exitModal() {
            let result = confirm("Вы точно хотите закрыть окно?");
            if (result) {
                this.isModalOpen.isModalMobileUploadVisible = false;
            }

        },
        makePreview(e) {
            e.preventDefault();
            let file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                return;
            }
            this.imageRaw = file[0];
            this.image = URL.createObjectURL(new File(file, file.name));


        },
        nextStep() {
            this.step++;
        },
        prevStep() {
            this.step--;
        },
        async finishStep() {
            this.sending = true;
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('folder', this.folder);
            formData.append('tags', this.tags);
            formData.append('file', this.imageRaw);
            formData.append('rate', this.rate);

            const request = await axios.post('//furry-world.ru/console/post_image_create.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });

            if (request.data) {
                if (request.data.status == 'success') {
                    notifications.generateNotification('good', 'Загрузка прошла успешно');
                    this.isModalOpen.isModalMobileUploadVisible = false;

                } else {
                    notifications.generateNotification('bad', 'что-то пошло не так');
                }
            } else {
                notifications.generateNotification('bad', 'что-то пошло не так');
            }
        }
    }
}
</script>