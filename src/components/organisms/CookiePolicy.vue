<template>
    <div class="cookie-policy">
        <div class="policy-container" v-if="!isMobile">
            <h1>Политика использования файлов cookie</h1>
            <p>
                Мы используем файлы cookie для улучшения вашего опыта на нашем сайте. Файлы cookie помогают нам
                запомнить ваши предпочтения и настройки, а также анализировать трафик на сайте.
            </p>
            <p>
                Вы можете управлять настройками файлов cookie в вашем браузере. Если вы продолжаете использовать наш
                сайт,
                мы будем считать, что вы согласны с использованием файлов cookie.
            </p>
            <p>
                Для получения дополнительной информации о том, как мы используем файлы cookie, пожалуйста, ознакомьтесь
                с
                нашей <a href="/cookie-policy/">Политикой использования файлов Cookie</a>.
            </p>
        </div>
        <div class="policy-container" v-if="isMobile">
            <b>Политика использования файлов cookie</b>
            <p>
                Мы используем файлы cookie для улучшения вашего опыта на нашем сайте. Подробнее <a
                    href="/cookie-policy/">Политикой использования файлов Cookie</a>.
            </p>
        </div>
        <div class="btn btn--success" @click="allowCookies">Принимаю</div>
    </div>
</template>
<style scoped>
.cookie-policy {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    bottom: 0;
    color: black;
    display: flex;
    gap: 20px;
    z-index: 999999;

}

.policy-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.btn {
    width: 150px;
    height: 80px;
    align-content: center;
    align-self: safe center;

}


@media (max-width:760px) {
    .cookie-policy {
        flex-wrap: wrap;
        flex-direction: column;
        ;
    }

    .hidden-mobile {
        display: none;
    }
}
</style>
<script>
import { allowedCookie, mobileDevice } from '@main/state';

export default
    {
        data() {
            return {
                isMobile: mobileDevice.isMobile,
            }
        },
        methods: {
            allowCookies() {
                localStorage.setItem('allowcookie', 1);
                allowedCookie.allowed = true;
            }
        }
    }
</script>