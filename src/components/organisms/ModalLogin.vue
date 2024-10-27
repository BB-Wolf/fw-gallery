<template>
    <Transition :duration="{ enter: 500, leave: 800 }">
        <div id="login" class="modal" v-show="isModalOpen.isModalVisible">
            <div class="modal-left-column"></div>
            <div class="modal-right-column">
                <div class="modal-title">
                    <div class="h1">Добро пожаловать</div>
                    <div>Если Вы уже регистрировались, введите Ваши данные для авторизации</div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Логин:</label>
                        <input type="text" v-model="login" placeholder="Введите Ваш логин">
                    </div>
                    <div class="form-group">
                        <label>Пароль:</label>
                        <input type="password" v-model="password" placeholder="Введите Ваш паароль">
                    </div>
                    <div class="form-group" style="padding-right:0; margin-top:20px;">
                        <button class="button-53" @click="sendData" role="button">Войти</button>
                    </div>
                </div>
                <div class="modal-foot">
                    Войти с помощью:
                    <div class="modal-oauth">

                    </div>

                    <a href="/register">Регистрация</a>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
#login {
    max-width: 1200px;
    max-height: 600px;
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
    background: url('../../assets/images/modal_bg.jpg') no-repeat;
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
    max-width: 460px;
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
</style>

<script>
import { modalState } from '../../state.js';
import axios from 'axios';
export default {
    data() {
        return {
            isModalOpen: modalState,
            login: null,
            password: null,
        }
    },
    methods:
    {
       async sendData() {
            if (this.login == null || this.password == null) {
                document.querySelector('#login').classList.add('shake-form');
                setTimeout(() => document.querySelector('#login').classList.remove('shake-form'), 500);
                return false;
            }

            var loginRequest = await axios.post('//img-fw.bb-wolf.site/console/post_login.php',
                {
                    login: this.login,
                    password: this.password
                }
            );
            if (loginRequest.data) {
                if (loginRequest.data.success == 'true') {
                    localStorage.setItem('token', loginRequest.data.token);
                } else {
                    document.querySelector('#login').classList.add('shake-form');
                    setTimeout(() => document.querySelector('#login').classList.remove('shake-form'), 500);
                    return false;
                }
            }
        }

    }
}
</script>