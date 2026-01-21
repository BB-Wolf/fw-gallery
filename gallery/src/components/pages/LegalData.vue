<template>
    <div class="legal-container">
        <h1>Собираемые данные</h1>

        <p>
            Настоящий документ описывает типы данных, которые собираются для обеспечения корректной работы Сайта.
        </p>

        <section>
            <p>
                <strong>Для обеспечения корректной работы Сайта мы используем:</strong>
            </p>
            <p>
                <strong>Технические куки</strong> — для идентификации сессий и ускорения загрузки данных.
            </p>
            <p>
                <strong>WebStorage</strong> — для хранения данных авторизации и настроек пользователя.
            </p>
        </section>

        <section>
            <h2>Информацию о посещении</h2>
            <ul>
                <li>IP-адрес.</li>
                <li>Браузер и операционная система.</li>
                <li>Время и страницы посещения.</li>
            </ul>
        </section>

        <section>
            <p>
                Эти данные используются исключительно для анализа логов, предотвращения атак на Сайт и защиты авторских
                материалов.
            </p>
        </section>
    </div>
</template>

<style scoped>
.legal-container {
    padding: 40px 20px;
    max-width: 1000px;
    margin: 0 auto;
    color: #e0e0e0;
    line-height: 1.7;
    font-family: 'Montserat', sans-serif;
}

h1 {
    font-size: 2.2rem;
    color: #ffffff;
    margin-bottom: 2.5rem;
    text-align: center;
    font-weight: 700;
    border-bottom: 2px solid #444;
    padding-bottom: 1rem;
}

section {
    margin-bottom: 2rem;
}

h2 {
    font-size: 1.6rem;
    color: #ffd700;
    margin-bottom: 1.2rem;
    font-weight: 600;
}

p {
    margin-bottom: 1.2rem;
    text-align: justify;
}

strong {
    color: #ffffff;
    font-weight: 700;
}

ul {
    padding-left: 20px;
    margin-bottom: 1.2rem;
    list-style-type: disc;
    display: block;
}

li {
    margin-bottom: 0.5rem;
    color: #e0e0e0;
}

@media (max-width: 768px) {
    .legal-container {
        padding: 20px 15px;
    }

    h1 {
        font-size: 1.8rem;
    }

    h2 {
        font-size: 1.4rem;
    }
}
</style>