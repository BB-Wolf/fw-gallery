<script>
import ModalLogin from './ModalLogin.vue';
import ModalRegister from './ModalRegister.vue';
import axios from 'axios';
import { modalState, isUserLogged, mobileDevice } from '../../state.js';

export default {
    components: {
        ModalLogin,
        ModalRegister,
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
        if (localStorage.getItem('nsfw')) {
            this.nswfState = localStorage.getItem('nsfw');
        }

    },
    methods: {
        showLogin() {
            modalState.isModalLoginVisible = true;
        },
        async switchNSFW() {
            const nswfReq = await new axios.get('//img-fw.bb-wolf.site/console/get_switch_nsfw.php',
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
        }

    }
};
</script>

<template>
    <header>
        <a class="h1" href="/">Furry World. Истории</a>
        <nav>
            <div class="nsfw-state" @click="switchNSFW">NSFW: {{ this.nswfState }}</div>
            <a href="/stories/">Все истории</a>
            <a href="#" v-show="!isUser" @click="showLogin">Войти</a>
            <a v-show="isUser" href="/personal/stories/">Мои работы</a>
            <a href="/personal/" v-show="isUser">Профиль</a>
            <a v-show="isUser" @click="logout">Выйти</a>
        </nav>
    </header>
    <ModalLogin />
    <ModalRegister />
</template>
<style>
/* CSS */
.search {
    background-color: #272727;
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
    max-width: 1200px;
    position: relative;
    transform: rotate(0deg);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.search:focus {
    outline: 0;
}

.search:after {
    content: '';
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
}

.search:hover:after {
    bottom: 2px;
    left: 2px;
}

.search__text {
    width: 100%;
    padding: 10px;
    position: relative;
    z-index: 3;
}
</style>