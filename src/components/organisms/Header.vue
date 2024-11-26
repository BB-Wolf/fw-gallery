<script>
import ModalLogin from './ModalLogin.vue';
import ModalRegister from './ModalRegister.vue';
import ModalUpload from './ModalUpload.vue';
import axios from 'axios';
import { modalState, isUserLogged } from '../../state';

export default {
    components: {
        ModalLogin,
        ModalRegister,
        ModalUpload
    },
    data() {
        return {
            isUser: isUserLogged.userLogged,
            nswfState: 'Clean'
        }
    },
    created() {
        isUserLogged.validate()

    },
    methods: {
        showLogin() {
            modalState.isModalLoginVisible = true;
        },
        showUpload() {
            modalState.isModalUploadVisible = true;
        },
        async switchNSFW() {
            // const nswfReq = await axios.get('');

        },
        logout() {
            localStorage.removeItem('token');
        }

    }
};
</script>

<template>
    <header>
        <a class="h1" href="/">Art Gallery</a>
        <nav>
            <div class="nsfw-state" @click="switchNSFW">NSFW: Clean</div>
            <a href="/main/">Gallery</a>
            <a href="#" v-show="!isUser" @click="showLogin">Log In</a>
            <a v-show="isUser" @click="showUpload">Загрузить</a>
            <a href="/personal/" v-show="isUser">Персональный раздел</a>
            <a v-show="isUser" @click="logout">Exit</a>
        </nav>
    </header>
    <ModalLogin />
    <ModalRegister />
    <ModalUpload />
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