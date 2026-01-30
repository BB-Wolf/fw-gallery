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
#suggest-idea {
    max-width: 800px;
    /* Smaller than login since less content? Or same? User said "like others". Let's stick to max-width */
    max-height: 850px;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    display: flex;
    background-color: #2b2b2b;
    flex-direction: row;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.3);
    z-index: 999999;
}

.modal-left-column {
    max-width: 300px;
    /* Reduced width as we don't have a big image */
    width: 100%;
    background-color: #2b2b2b;
    /* Gray background as requested */
    display: none;
    /* Hide on small screens via media query usually, but here we can keep it or hide it. User said "gray background". */
}

@media (min-width: 768px) {
    .modal-left-column {
        display: block;
        background: url('@gallery/assets/images/modal_login.jpg') no-repeat;
        /* Optional: use same image or just gray? User said "gray background". Let's use gray. */
        background: #232323;
    }
}

.modal-right-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    padding: 30px;
    position: relative;
    /* For close button */
    overflow-y: auto;
}

.modal-title .h1 {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #d8d8d8;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    color: #d8d8d8;
    font-weight: 600;
}

.input-select,
textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #bfbfbf;
    /* Match input style from login */
    color: #000;
    font-size: 16px;
}

.button-53 {
    width: 100%;
    padding: 12px;
    background-color: #3DD1E7;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
}

/* Close button - mimicing main.css global .close but ensuring visibility if scoped issues exist via deep or local */
.close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 10;
}

.close:before,
.close:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: white;
    top: 50%;
    left: 0;
}

.close:before {
    transform: rotate(45deg);
}

.close:after {
    transform: rotate(-45deg);
}
</style>
