<script>
import ModalLogin from './ModalLogin.vue';

import { modalState, isUserLogged } from '../../state';

export default {
    components: {
        ModalLogin
    },
    data() {
        return {
            isUser: isUserLogged.isLogged
        }
    },
    methods: {
        showLogin() {
            modalState.isModalVisible = true;
        }

    }
};
</script>

<template>
    <header>
        <a class="h1" href="/">Art Gallery</a>
        <nav>
            <a href="/">Home</a>
            <a href="/main/">Gallery</a>
            <a href="#" v-show="!isUser" @click="showLogin">Log In</a>
            <a href="/personal/" v-show="isUser">Profile</a>
            <a href="/logout/" v-show="isUser">Exit</a>
        </nav>
    </header>
    <ModalLogin />
</template>
