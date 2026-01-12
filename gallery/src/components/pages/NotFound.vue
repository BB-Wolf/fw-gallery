<template>
    <section id="404">
        <div class="container">
            <div class="error">
                <div class="error-img">
                    <img src="../../assets/images/lis4.png">
                </div>
                <div>
                    <div class="h2">Упс, что-то пошло не так!</div>
                    <div class="error-text">Ссылка, по которой Вы пришли неверная или устаревшая. Пожалуйста, вернитесь
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

