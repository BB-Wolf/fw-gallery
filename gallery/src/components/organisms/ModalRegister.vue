<template>
    <div class="overlay-bg" v-show="isModalOpen.isModalRegisterVisible"></div>

    <div v-if="regMode == ''" id="register" class="modal" v-show="isModalOpen.isModalRegisterVisible">
        <div class="modal-left-column"></div>
        <div class="modal-right-column" v-if="!responseData.success">
            <span class="close" @click="closeModal"></span>
            <div class="modal-title">
                <noindex>
                    <div class="h1">Добро пожаловать</div>
                    <div>Выберите удобный режим регистрации. <br />
                    </div>

                </noindex>
            </div>
            <div class=" modal-body">
                <div class="form-group">
                    <div id="VkIdSdkOneTap"></div>
                </div>
                <div class="form-group">
                    <div class="btn btn--default" @click="this.regMode = 'telegram'" style="background-color: #d8d8d8;">
                        Telegram</div>
                </div>
                <div class="form-group">
                    <div class="btn btn--default" @click="this.regMode = 'regular'" style="background-color: #d8d8d8;">
                        Логин + пароль + файл
                        восстановления</div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="regMode == 'telegram'" id="register" class="modal" v-show="isModalOpen.isModalRegisterVisible">
        <div class="modal-left-column"></div>
        <div class="modal-right-column">
            <span class=" close" @click="closeModal"></span>
            <div class="modal-title">
                <noindex>
                    <div class="h1">Добро пожаловать</div>
                </noindex>
            </div>
            <div class="modal-body" v-if="getTgResponse == false">
                <telegram-login-temp mode="callback" telegram-login="FWAuthorizeBot" @callback='yourCallbackFunction'
                    redirect-url="https://furry-world.ru" />
                <div class="btn" @click="this.regMode = ''">Назад</div>
            </div>
        </div>
    </div>



    <div v-if="regMode == 'regular'" id="register" class="modal" v-show="isModalOpen.isModalRegisterVisible">
        <div class="modal-left-column"></div>
        <div class="modal-right-column" v-if="!responseData.success">
            <span class="close" @click="closeModal"></span>
            <div class="modal-title">
                <noindex>
                    <div class="h1">Добро пожаловать</div>
                    <div style="color: #d8d8d8;">Введите Ваши данные для регистрации. <br />
                        Пожалуйста, не используйте Ваш e-mail в качестве логина
                    </div>
                </noindex>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Логин (будет отображаться в качестве имени Автора):</label>
                    <input type="text" v-model="login" placeholder="Введите Ваш логин">
                </div>
                <div class="form-group">
                    <label>Пароль:</label>
                    <input type="password" v-model="password" placeholder="Введите Ваш пароль">
                </div>
                <div class="form-group">
                    <label>E-mail :</label>
                    <div class="muted">Мы не храним Вашу почту, сюда будет отправлен файл с ключом для
                        восстановелния
                        доступа</div>
                    <input type="password" v-model="email" placeholder="Введите Ваш email">
                </div>
                <div class="form-group" style="padding-right:0; margin-top:20px;">
                    <button class="button-53" @click="sendData" role="button">Регистрация</button>
                </div>
            </div>
            <div class="modal-foot">
                <div class="" v-if="hasResponse">
                    <div v-if="!responseData.success" style="font-weight: bold;color:red;">{{ responseData.text
                        }}
                    </div>
                </div>
                <div class="btn" @click="this.regMode = ''">Назад</div>
            </div>
        </div>
        <div class="modal-right-column_greet" v-if="responseData.success">
            <span class="close" @click="closeModal"></span>
            <div class="modal-title">
                <div class="h1" style="color:black;">Добро пожаловать, {{ login }}</div>
            </div>
            <div class="modal-body">
                <div class="register__success mt-20 mb-20" v-html="responseData.text"></div>
                <div class="tags">
                    <div class="mnemonic" v-for="word in responseData.words" :key="word">
                        <span>{{ word }}</span>
                    </div>
                </div>
                <div class="mnemonic__link tags" style="margin-top:-30px;justify-content: center;"><span>
                        <a target="_blank" :href="responseData.link">
                            <svg fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 485.017 485.017" xml:space="preserve">
                                <g>
                                    <path d="M361.205,68.899c-14.663,0-28.447,5.71-38.816,16.078c-21.402,21.403-21.402,56.228,0,77.631
		c10.368,10.368,24.153,16.078,38.815,16.078s28.447-5.71,38.816-16.078c21.402-21.403,21.402-56.228,0-77.631
		C389.652,74.609,375.867,68.899,361.205,68.899z M378.807,141.394c-4.702,4.702-10.953,7.292-17.603,7.292
		s-12.901-2.59-17.603-7.291c-9.706-9.706-9.706-25.499,0-35.205c4.702-4.702,10.953-7.291,17.603-7.291s12.9,2.589,17.603,7.291
		C388.513,115.896,388.513,131.688,378.807,141.394z" />
                                    <path d="M441.961,43.036C414.21,15.284,377.311,0,338.064,0c-39.248,0-76.146,15.284-103.897,43.036
		c-42.226,42.226-54.491,105.179-32.065,159.698L0.254,404.584l-0.165,80.268l144.562,0.165v-55.722h55.705l0-55.705h55.705v-64.492
		l26.212-26.212c17.615,7.203,36.698,10.976,55.799,10.976c39.244,0,76.14-15.282,103.889-43.032
		C499.25,193.541,499.25,100.325,441.961,43.036z M420.748,229.617c-22.083,22.083-51.445,34.245-82.676,34.245
		c-18.133,0-36.237-4.265-52.353-12.333l-9.672-4.842l-49.986,49.985v46.918h-55.705l0,55.705h-55.705v55.688l-84.5-0.096
		l0.078-37.85L238.311,208.95l-4.842-9.672c-22.572-45.087-13.767-99.351,21.911-135.029C277.466,42.163,306.83,30,338.064,30
		c31.234,0,60.598,12.163,82.684,34.249C466.34,109.841,466.34,184.025,420.748,229.617z" />
                                </g>
                            </svg>
                            Файл с ключом</a>
                    </span></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input[type='text'] {
    background-color: #bfbfbf;
    color: #000;
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

#register {
    max-width: 1200px;
    max-height: 700px;
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
    transition: transform 0.3s;
}

.modal-left-column {
    max-width: 500px;
    width: 100%;
    background: url('@gallery/assets/images/login_bg.jpg') no-repeat;
    background-size: cover;

}

.modal-right-column {
    display: flex;
    position: relative;
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
    color: #d8d8d8;
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
    margin-bottom: 10px;
    flex-wrap: wrap;

}

.form-group label {
    font-size: 18px;
    font-weight: 600;
    color: #d8d8d8;

}


/* CSS */
.button-53 {
    background-color: #ffcc00;
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

.tags {
    padding: 20px 10px;
}

.tags__no-bg {
    background: unset;
}

.tags a {
    background-color: #2c2c2c;
    color: white;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.6s ease-in-out;
    height: 60px;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.h1--black {
    color: black;
}
</style>

<script>
import { modalState } from '@main/state';

import axios from 'axios';
import { telegramLoginTemp } from 'vue3-telegram-login'
import * as VKID from '@vkid/sdk';

export default {
    components:
    {
        telegramLoginTemp,
    },
    data() {
        return {
            isModalOpen: modalState,
            login: null,
            regMode: '',
            password: null,
            email: null,
            getTgResponse: false,
            hasResponse: false,
            responseData: {
                'success': false
            },
        }
    },
    methods:
    {
        async yourCallbackFunction(user) {
            // gets user as an input
            // id, first_name, last_name, username,
            // photo_url, auth_date and hash
            let registerRequest = await axios.post('//furry-world.ru/console/post_register.php',
                {
                    login: user.username,
                    password: user.hash,
                    ext_id: user.id,
                    ext: 'tg'
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (registerRequest.data) {
                if (registerRequest.data.success) {
                    this.hasResponse = true;
                    this.responseData = registerRequest.data;
                    localStorage.setItem('token', this.responseData.token);
                    location.reload;
                } else {
                    document.querySelector('#register').classList.add('shake-form');
                    setTimeout(() => document.querySelector('#register').classList.remove('shake-form'), 500);
                    this.hasResponse = true;
                    this.responseData = registerRequest.data;
                }
            }

        },
        closeModal() {
            modalState.isModalRegisterVisible = false;
        },
        async sendData() {
            if (this.login == null || this.password == null) {
                document.querySelector('#register').classList.add('shake-form');
                setTimeout(() => document.querySelector('#register').classList.remove('shake-form'), 500);
                return false;
            }

            let registerRequest = await axios.post('//furry-world.ru/console/post_register.php',
                {
                    login: this.login,
                    password: this.password
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );

            if (registerRequest.data) {
                if (registerRequest.data.success == 'true') {
                    this.hasResponse = true;
                    this.responseData = registerRequest.data;
                    localStorage.setItem('token', this.responseData.token);
                    location.reload;
                } else {
                    document.querySelector('#register').classList.add('shake-form');
                    setTimeout(() => document.querySelector('#register').classList.remove('shake-form'), 500);
                    this.hasResponse = true;
                    this.responseData = registerRequest.data;
                }
            }
        },
        vkidOnSuccess(data) {
            // Обработка полученного результата
            console.log(data);
        },

        vkidOnError(error) {
            // Обработка ошибки
        }
    },
    mounted() {
        VKID.Config.init({
            app: 53581702,
            redirectUrl: 'https://furry-world.ru',
            responseMode: VKID.ConfigResponseMode.Callback,
            state: 'ready',
        });

        const oneTap = new VKID.OneTap();

        const container = document.getElementById('VkIdSdkOneTap');

        if (container) {
            oneTap.render({
                container: container,
                showAlternativeLogin: true
            })
                .on(VKID.WidgetEvents.ERROR, '')
                .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
                    const code = payload.code;
                    const deviceId = payload.device_id;

                    VKID.Auth.exchangeCode(code, deviceId)
                        .then((data) => {
                            console.log(data);
                            // let registerRequest = axios.post('//furry-world.ru/console/post_register.php',
                            //     {
                            //         login: user.username,
                            //         password: user.hash,
                            //         ext_id: user.id,
                            //         ext: 'vk'
                            //     }, {
                            //     headers: {
                            //         'Content-Type': 'application/json'
                            //     }
                            // });
                        });
                });
        }
    }



}
</script>