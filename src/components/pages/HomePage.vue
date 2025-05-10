<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    color: #f0f0f0;
    line-height: 1.6;
}


h2 {
    color: white;
    font-weight: bold;
    font-size: 2rem;
}


.hero,
.section {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease forwards;
}

.hero {
    animation-delay: 0.2s;
}

.section {
    animation-delay: 0.4s;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 4rem 1rem;
    background-color: #333;
}

.hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    max-width: 600px;
}

.section h2 {
    margin-bottom: 2rem;
}

.gallery,
.comics,
.news {}

.gallery-images,
.comics-covers {}

.gallery-images img,
.comics-covers img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
}

.news,
.gallery,
.comics {
    background-color: #292929;

}

.news-article {
    margin-bottom: 1.5rem;
}

.news-article h3 {
    margin-bottom: 0.5rem;
}

footer {
    background-color: #2c2c2c;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
}

@media (min-width: 768px) {
    .hero h1 {
        font-size: 3rem;
    }

    .hero p {
        font-size: 1.4rem;
    }
}
</style>
<template>
    <section class="hero">
        <div></div>
    </section>
    <section class="section news" id="news">
        <div class="section-container">
            <h2>Новости проекта</h2>
            <div class="news-article">
                <h3>Всем привет! На связи Sian</h3>
                <p>Мы долго шли к этому моменту, и вот он настал!
                    Наконец запустили раздел с фанфиками и рассказами.
                    Теперь вы можете не только читать комиксы, но и погружаться в миры, созданные нашими талантливыми
                    авторами.
                    Мы уверены, что это только начало, и впереди нас ждут еще более захватывающие приключения.
                    Мы будем рады видеть ваши работы и идеи, которые вы хотите воплотить в жизнь.

                </p>
            </div>
        </div>
    </section>
    <!--    <section class="section" id="about">
        <div class="container">
            <h2>О нас</h2>
            <p></p>
        </div>
    </section>-->

    <section class="section gallery" id="gallery">
        <div class="section-container">
            <h2>Галерея</h2>
            <div class="muted">Топ по просмотрам за день</div>
            <div class="gallery-images">
                <GalleryBlock needInfinty="m" galleryType="main" galleryTitle="" />
            </div>
        </div>
    </section>

    <section class="section comics" id="comics">
        <div class="section-container">
            <h2>Комиксы</h2>
            <div class="muted">Последние обновления</div>
            <div class="comics-covers">
                <ComicsList needInfinty="m" galleryType="main" galleryTitle="" />
            </div>
        </div>
    </section>
</template>
<script>
import GalleryBlock from '@main/components/organisms/GalleryBlock.vue';
import ComicsList from '@main/components/organisms/ComicsList.vue';
export default
    {
        components:
        {
            GalleryBlock,
            ComicsList
        },
    }
</script>