<template>
    <div class="comics-container mt-20 mb-20" style="justify-content: flex-start;">
        <div class="h2">Новые выпуски комиксов</div>
    </div>
    <div class="comics-container mt-20 mb-20">
        <div class="card">
            <div class="card__face card__face--front">
                <img src="https://i.loli.net/2019/11/23/cnKl1Ykd5rZCVwm.jpg" />
            </div>
            <div class="card__face card__face--overlay">
                <div class="card__title">Комикс 1</div>
                <div class="card__short-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis officiis
                    eum itaque blanditiis voluptate soluta ut, corrupti fuga molestias sint aut repellat, nam aliquam.
                    Dignissimos iusto placeat tempora omnis libero!</div>
                <a class="card__link" href="">Перейти к комиксу</a>

            </div>
        </div>
        <div class="card">
            <div class="card__face card__face--front">
                <img src="https://i.loli.net/2019/11/16/FLnzi5Kq4tkRZSm.jpg" />
            </div>
            <div class="card__face card__face--back">
                <img src="https://i.loli.net/2019/10/18/buDT4YS6zUMfHst.jpg" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.comics-container {
    padding: 0 15px;
    display: flex;
    perspective: 800px;
    gap: 20px;
    justify-content: space-evenly;
}

.comics-container .card {
    position: relative;
    width: 420px;
    height: 480px;
    color: white;
    cursor: pointer;
    transition: 1s ease-in-out;
    transform-style: preserve-3d;
    overflow: hidden;

}

.comics-container .card:hover>.card__face--overlay {
    top: 0 !important;
}

.comics-container .card .card__face {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: 0.5s ease-in-out;
}

.comics-container .card .card__face img {
    width: 420px;
    height: 480px;
    -o-object-fit: cover;
    object-fit: cover;
}

.comics-container .card__face--overlay {
    top: -500px !important;
    background-color: rgba(0, 0, 0, 0.5);
}

.comics-container .card__title {
    padding: 20px 15px 0px 15px;
    font-weight: bold
}

.comics-container .card__short-desc {
    padding: 20px 15px 0 15px;
    font-weight: 600;
    font-style: italic;
}

.comics-container .card__link {
    color: rgb(255, 221, 72);
    font-weight: bold;
    display: block;
    padding: 60px 15px 0px 15px;

}
</style>