<template>
    <section id="404">
        <div class="container">
            <div class="error">
                <div class="error-img">
                    <img src="../../assets/images/lis4.png">
                </div>
                <div>
                    <div class="h2">Упс! Что-то пошло не так</div>
                    <div class="error-text">Ссылка по которй Вы пришли неверная или устаревшая. Пожалуйста, вернитесь
                        назад
                        и
                        попробуйте снова!</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    created: function () {
        // Redirect outside the app using plain old javascript
        //window.location.href = "/404.html";
    }
}
</script>
<style scoped>
.error-text {
    color: white;
    padding: 15px;
}

.error {
    display: flex;
    width: 100%;
    margin-top: 20px;
}

.error-img {
    width: 240px;
    ;
}

.error-img img {
    max-width: 100%;

}
</style>
