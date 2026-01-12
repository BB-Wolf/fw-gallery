<template>
    <div class="overlay-bg" v-show="isModalOpen.isModalLoginVisible"></div>

    <Transition :duration="{ enter: 500, leave: 800 }">
        <div id="login" class="modal" v-show="isModalOpen.isModalLoginVisible">
            <div class="modal-left-column"></div>
            <div class="modal-right-column">
                <span class="close" @click="closeModal"></span>
                <div class="modal-title">
                    <div class="h1">Добро пожаловать</div>
                    <div style="color: #d8d8d8;">Если Вы уже регистрировались, введите Ваши данные для авторизации
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="error-place" v-if="this.errorText">{{ this.errorText }}</div>
                    </div>
                    <div class="form-group">
                        <label>Логин:</label>
                        <input type="text" v-model="login" placeholder="Введите Ваш логин">
                    </div>
                    <div class="form-group">
                        <label>Пароль:</label>
                        <input type="password" v-model="password" placeholder="Введите Ваш пароль">
                    </div>
                    <div class="form-group" style="padding-right:0; margin-top:20px;">
                        <button class="button-53" @click="sendData" role="button">Войти</button>
                    </div>
                </div>
                <div class="modal-foot">
                    <div class="form-group" style="padding-right:0; margin-top:20px;">
                        <button class="button-53" style="background-color:  #ffcc00;" @click="registerModal"
                            role="button">Регистрация</button>

                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>



<script>
import { modalState, isUserLogged } from '@main/state';

import axios from 'axios';
export default {
    data() {
        return {
            isModalOpen: modalState,
            isUser: isUserLogged.userLogged,
            login: null,
            password: null,
            errorText: false
        }
    },
    methods:
    {
        closeModal() {
            this.isModalOpen.isModalLoginVisible = false;
            document.body.style.overflow = '';
        },
        async sendData() {
            if (this.login == null || this.password == null) {
                document.querySelector('#login').classList.add('shake-form');
                setTimeout(() => document.querySelector('#login').classList.remove('shake-form'), 500);
                return false;
            }

            const formData = new FormData();
            formData.append('login', this.login);
            formData.append('password', this.password);

            const loginRequest = await axios.post('//furry-world.ru/console/post_login.php',
                formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            if (loginRequest.data) {
                if (loginRequest.data.success == 'true') {
                    localStorage.setItem('token', loginRequest.data.token);
                    modalState.isModalLoginVisible = false;
                    isUserLogged.setLogin();
                    location.reload();
                } else {
                    document.querySelector('#login').classList.add('shake-form');
                    setTimeout(() => document.querySelector('#login').classList.remove('shake-form'), 500);
                    return false;
                }
            }
        },
        registerModal() {
            modalState.isModalLoginVisible = false;
            modalState.isModalRegisterVisible = true;
        }

    }
}
</script>