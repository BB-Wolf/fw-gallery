<script>
import { modalState, isUserLogged, mobileDevice } from '@main/state';
import ModalLogin from '@gallery/components/organisms/ModalLogin.vue';
import ModalRegister from '@gallery/components/organisms/ModalRegister.vue';
import axios from 'axios';

export default {
    components: {
        ModalLogin,
        ModalRegister
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
    methods:
    {
        showLogin() {
            document.body.style.overflow = 'hidden';
            modalState.isModalLoginVisible = true;
        },
        async switchNSFW() {
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
                }
                if (nswfReq.data.nsfw == 8) {
                    this.nswfState = '16+';
                    localStorage.setItem('token', nswfReq.data.token);
                    localStorage.setItem('nsfw', '16+');
                }
                if (nswfReq.data.nsfw == 9) {
                    this.nswfState = '18+';
                    localStorage.setItem('token', nswfReq.data.token);
                    localStorage.setItem('nsfw', '18+');
                }
            }
        },
        logout() {
            localStorage.removeItem('token');
            location.reload();
        }
    }
}
    ;
</script>

<template>
    <header>
        <a class="h1" href="/">Фурри Мир</a>
        <nav>
            <div class="nsfw-state"
                :class="[{ ['nsfw-state--clean']: nswfState == '0+', ['nsfw-state--mild']: nswfState == '16+', ['nsfw-state--notsafe']: nswfState == '18+' }]"
                @click="switchNSFW">Ценз: {{ this.nswfState }}</div>
            <a href="/gallery/">Галерея</a>
            <a href="/gallery/comics/">Комиксы</a>
            <a href="/novel/">Рассказы</a>
            <!--  <a href="/novel/">Рассказы</a>-->
            <a href="#" v-show="!isUser" @click="showLogin">Войти</a>
            <a v-show="isUser" @click="logout">Выйти</a>
        </nav>
    </header>
    <ModalLogin />
    <ModalRegister />
</template>
<style>
.nsfw-state {
    position: relative;
}

@media (min-width:768px) {
    .nsfw-state--clean::before {
        content: '';
        position: absolute;
        left: 0;
        transform: translate(-80px, -22px);
        background: url('@gallery/assets/images/volk.png') 0 0;
        background-size: contain;
        z-index: 10;
        height: 80px;
        width: 80px;
    }

    .nsfw-state--mild::before {
        content: '';
        position: absolute;
        left: 0;
        transform: translate(-80px, -22px);
        background: url('@gallery/assets/images/volk4.png') 0 0;
        background-size: contain;
        z-index: 10;
        height: 80px;
        width: 80px;
    }

    .nsfw-state--notsafe::before {
        content: '';
        position: absolute;
        left: 0;
        transform: translate(-80px, -22px);
        background: url('@gallery/assets/images/volk5.png') 0 0;
        background-size: contain;
        z-index: 10;
        height: 80px;
        width: 80px;
    }
}

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