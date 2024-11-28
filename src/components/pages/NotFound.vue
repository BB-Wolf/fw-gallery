<template>
    <section id="404">
        <div class="container">
            <div class="h1">Упс! Что-то пошло не так</div>
            <div class="error-text">Ссылка по которй Вы пришли неверная или устаревшая. Пожалуйста, вернитесь назад и
                попробуйте снова!</div>
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
}
</style>