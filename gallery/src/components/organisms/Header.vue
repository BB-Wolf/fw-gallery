<script>
import ModalLogin from '@gallery/components/organisms/ModalLogin.vue';
import ModalRegister from './ModalRegister.vue';
import ModalUploadMobile from './ModalUploadMobile.vue';
import axios from 'axios';
import { modalState, isUserLogged, mobileDevice, isAgeAgreed, userSettingsStore } from '@main/state.js';
import NewModalUpload from './NewModalUpload.vue';
const userSettings = userSettingsStore();

export default {
    components: {
        ModalLogin,
        ModalRegister,
        ModalUploadMobile,
        NewModalUpload
    },
    data() {
        return {
            isUser: isUserLogged.userLogged,
            nswfState: '0+',
            userDevice: mobileDevice
        }
    },
    created() {
        isUserLogged.validate();
        userSettings.fetchSettings();
        console.log(userSettings.getUserFolders);
        if (localStorage.getItem('nsfw')) {
            this.nswfState = localStorage.getItem('nsfw');
        }
    },
    methods: {
        showLogin() {
            document.body.style.overflow = 'hidden';
            modalState.isModalLoginVisible = true;
        },
        showUpload() {
            console.log(mobileDevice.isMobile);
            if (mobileDevice.isMobile) {
                modalState.isModalMobileUploadVisible = true;

            } else {
                modalState.isModalUploadVisible = true;
            }
        },
        async switchNSFW() {
            if (isAgeAgreed.agreed != true) {
                let isOk = prompt('Чтобы изменить уровень цензуры, подтвердите, что вам есть 18 лет напечатав "Да" в поле ниже.');
                if (isOk == null || isOk.toLowerCase() != 'да') {
                    alert('Подтверждение не получено. Изменение уровня цензуры отменено.');
                    return;
                } else {
                    isAgeAgreed.setAgreed();
                }
            }
            const nswfReq = await new axios.get('//furry-world.ru/console/get_switch_nsfw.php',
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
            if (nswfReq.data) {
                if (nswfReq.data.nsfw == 7) {
                    this.nswfState = '0+';
                    localStorage.setItem('token', nswfReq.data.token);
                    localStorage.setItem('nsfw', '0+');
                    location.reload();
                }
                if (nswfReq.data.nsfw == 8) {
                    this.nswfState = '16+';
                    localStorage.setItem('token', nswfReq.data.token);
                    localStorage.setItem('nsfw', '16+');
                    location.reload();
                }
                if (nswfReq.data.nsfw == 9) {
                    this.nswfState = '18+';
                    localStorage.setItem('token', nswfReq.data.token);
                    localStorage.setItem('nsfw', '18+');
                    location.reload();
                }
            }
        },
        logout() {
            localStorage.removeItem('token');
            location.reload();
        }

    }
};
</script>

<template>
    <header>
        <a class="h1" href="/">Фурри Мир</a>
        <nav>
            <div v-if="this.isUser" class="nsfw-state"
                :class="[{ ['nsfw-state--clean']: nswfState == '0+', ['nsfw-state--mild']: nswfState == '16+', ['nsfw-state--notsafe']: nswfState == '18+' }]"
                @click="switchNSFW">Ценз: {{ this.nswfState }}</div>
            <a href="/gallery/main/">Все работы</a>
            <a href="#" v-show="!isUser" @click="showLogin">Войти</a>
            <a v-if="!userDevice.isMobile" v-show="isUser" @click="showUpload">Загрузить</a>
            <a v-if="userDevice.isMobile" href="/gallery/mupload/">Загрузить</a>
            <a href="/gallery/personal/" v-show="isUser">Профиль</a>
            <a v-show="isUser" @click="logout">Выйти</a>
        </nav>
    </header>
    <div>
        <ModalLogin />
    </div>
    <ModalRegister />
    <ModalUploadMobile v-if="userDevice.isMobile" />
    <NewModalUpload v-if="!userDevice.isMobile"></NewModalUpload>
</template>
