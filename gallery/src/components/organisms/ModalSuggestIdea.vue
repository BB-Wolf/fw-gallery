<template>
    <div class="overlay-bg" v-show="isModalOpen.isModalSuggestIdeaVisible"></div>

    <Transition :duration="{ enter: 500, leave: 800 }">
        <div id="suggest-idea" class="modal" v-show="isModalOpen.isModalSuggestIdeaVisible">
            <div class="modal-left-column" style="background-image: none; background-color: #2c2c2c;"></div> <!-- Simplified style -->
            <div class="modal-right-column">
                <span class="close" @click="closeModal"></span>
                <div class="modal-title">
                    <div class="h1">Предложить идею</div>
                    <div style="color: #d8d8d8;">Мы ценим ваши идеи! Пожалуйста, опишите ваше предложение.</div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="error-place" v-if="this.errorText">{{ this.errorText }}</div>
                        <div class="success-place" v-if="this.successText" style="color: green;">{{ this.successText }}</div>
                    </div>
                    <div class="form-group">
                        <label>Раздел сайта:</label>
                        <select v-model="section" class="input-select">
                            <option disabled value="">Выберите раздел</option>
                            <option>Галерея</option>
                            <option>Комиксы</option>
                            <option>Рассказы</option>
                            <option>Профиль</option>
                            <option>Общее</option>
                            <option>Другое</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Ваше предложение:</label>
                        <textarea v-model="suggestion" placeholder="Опишите вашу идею подробно..." rows="5" style="width: 100%; padding: 10px; border-radius: 5px;"></textarea>
                    </div>
                    <div class="form-group" style="padding-right:0; margin-top:20px;">
                        <button class="button-53" @click="sendData" role="button" :disabled="isLoading">
                            {{ isLoading ? 'Отправка...' : 'Отправить' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { modalState } from '@main/state';
import axios from 'axios';

export default {
    data() {
        return {
            isModalOpen: modalState,
            section: '',
            suggestion: '',
            errorText: false,
            successText: false,
            isLoading: false
        }
    },
    methods: {
        closeModal() {
            this.isModalOpen.isModalSuggestIdeaVisible = false;
            document.body.style.overflow = '';
            this.resetForm();
        },
        resetForm() {
            this.section = '';
            this.suggestion = '';
            this.errorText = false;
            this.successText = false;
        },
        async sendData() {
            if (this.section == '' || this.suggestion == '') {
                this.errorText = 'Пожалуйста, заполните все поля';
                document.querySelector('#suggest-idea').classList.add('shake-form');
                setTimeout(() => document.querySelector('#suggest-idea').classList.remove('shake-form'), 500);
                return;
            }

            this.isLoading = true;
            this.errorText = false;

            const formData = new FormData();
            formData.append('section', this.section);
            formData.append('suggestion', this.suggestion);

            try {
                const response = await axios.post('//furry-world.ru/console/post_create_github_issue.php',
                    formData, {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        }
                    }
                );

                if (response.data && response.data.success == 'true') {
                    this.successText = 'Спасибо! Идея отправлена.';
                    setTimeout(() => {
                        this.closeModal();
                    }, 2000);
                } else {
                    this.errorText = response.data.error || 'Произошла ошибка при отправке';
                }
            } catch (error) {
                this.errorText = 'Ошибка сети. Попробуйте позже.';
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>

<style scoped>
.input-select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
}
</style>
