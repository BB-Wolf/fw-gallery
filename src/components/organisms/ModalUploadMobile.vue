<template>
    <div class="steps" v-show="isModalOpen.isModalMobileUploadVisible">
        <div class="steps-container">
            <form id="mobileUpload">
                <!-- Step 1-->
                <div class="step-item" v-if="this.step == 1">
                    <div class="h2">Загрузка изображения</div>
                    <div class="form-group">
                        <label>Название работы</label>
                        <input type="text" v-model="title" name="title">
                    </div>
                    <div class="form-group">
                        <label>Изображение</label>
                        <input type="file" name="file" @change="makePreview">
                        <div class="steps-image__peview" v-if="image">
                            <img :src="this.image">
                        </div>
                    </div>
                    <div class="form-group f-align__end">
                        <div class="btn btn--info step--next" @click="nextStep">Вперед</div>
                    </div>
                </div>
                <!-- End of step1-->
                <!-- Step 2-->
                <div class="step-item" v-if="this.step == 2">
                    <div class="h2">Описание</div>
                    <div class="form-group">
                        <label>Теги</label>
                        <input type="text" v-model="tags" name="tags">
                    </div>
                    <div class="form-group">
                        <label>Папка</label>
                        <input type="text" v-model="folder" name="folder">
                    </div>
                    <div class="form-group"><label for="">Рейтинг</label>
                        <Multiselect v-model="rate" :options="rateOptions" />
                    </div>
                    <div class="form-group f-row f-space__between">
                        <div class="btn btn--primary step--prev" @click="prevStep">Назад</div>
                        <div class="btn btn--info step--next" @click="nextStep">Вперед</div>
                    </div>
                </div>

                <div class="step-item" v-if="this.step == 3">
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
                    <div class="form-group">
                        <label>Теги</label>
                        <div>
                            {{ this.tags }}
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
.steps {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #696969;
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
    max-width: 180px;
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
import { modalState } from '../../state';
import { notifications } from '@/state';
import axios from 'axios';

export default {
    components:
    {
        Multiselect
    },
    data() {
        return {
            isModalOpen: modalState,
            stepsTotal: null,
            step: 1,
            image: null,
            imageRaw: null,
            title: null,
            description: null,
            tags: null,
            folder: null,
            rate: null,
            rateOptions: [
                'Clean',
                '16+',
                '18+',
            ],
            sending: false
        }
    },
    methods:
    {
        exitModal() {
            let result = confirm("Are you sure you want to close modal?");
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
            formData.append('description', this.title);
            formData.append('folder', this.title);
            formData.append('tags', this.title);
            formData.append('file', this.rawFile);
            formData.append('rate', this.rate);

            const request = await axios.post('//furry-world.ru/console/post_image_create.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });

            if (request.data) {
                if (request.data.status == 'success') {
                    notifications.generateNotification('good', 'all good');
                } else {
                    notifications.generateNotification('bad', 'all good');
                }
            } else {
                notifications.generateNotification('bad', 'all bad');
            }
        }
    }
}
</script>