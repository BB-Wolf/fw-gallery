<template>
    <div class="comics-container" style="justify-content: flex-start;">
        <div class="h2">Новые выпуски комиксов</div>
    </div>
    <section class="storyboard-container tags">
        <div class="tags-wrapper">
            <div class="tags-scroll">
                <a :href="item.link" class="panel" v-for="(item, index) in comics" :key="item.id"
                    :class="panelClass(index)" :style="{ background: 'url(\'' + item.preview + ' \')' }">
                    <div class="gallery-item__hover">
                        <div class="gallery-item__title">
                            <a :href="item.link">{{ item.title }}</a>
                        </div>
                        <div class="gallery-item__author">
                            <b>Автор:</b><a :href="'/gallery/author/' + item.userName">{{ item.userName }}</a>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            comics: null,
        }
    },
    async created() {
        let getNewComics = await new axios.get('//furry-world.ru/console/get_new_comics.php?offset=1',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        );
        if (getNewComics.data) {
            this.comics = getNewComics.data;
        }
    },
    methods: {
        chunk(arr, size) {
            let result = [];
            for (let i = 0; i < arr.length; i += size) {
                result.push(arr.slice(i, i + size));
            }
            return result;
        },
        panelClass(index) {
            const classes = ['panel-a', 'panel-b', 'panel-c', 'panel-c', 'panel-d', 'panel-e']
            return classes[index % 6]
        }
    }
}
</script>

<style scoped>
.storyboard {
    width: 100%;
    display: grid;
    gap: 16px;
    background: #1b1b1b;
    padding: 20px;
    border-radius: 12px;

    min-height: 320px;
    grid-template-areas:
        "a b"
        "c c"
        "d e";
    grid-template-columns: 1fr 1fr;
}

.panel {
    background: #2a2a2a;
    width: 520px;
    height: 680px;
    background-size: cover !important;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
}

.panel img {
    width: 100%;
    object-fit: cover;

}


@media (max-width: 600px) {
    .panel {
        width: 330px;
        height: 350px;
    }

}

.gallery-item__hover {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    width: 100%;
    left: 0;
    bottom: 0;
    min-height: 120px;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    display: grid;
    grid-template-rows: 1fr 2fr;
}


.gallery-item__hover {
    bottom: -1000px;
}

.gallery-item__hover a {
    width: 100%;
    border: unset;
    background: unset;
    text-decoration: underline;
    font-weight: bold;
}

.gallery-item__title {
    font-size: 1.3rem;
}



.panel:hover>.gallery-item__hover {
    bottom: 00px;
}

.gallery-item__hover a {
    color: white;
}



/* Верхний левый блок */
.panel-a {
    grid-area: a;
    clip-path: polygon(4% 0, 100% 0, 100% 100%, 0 96%);
}

/* Верхний правый блок */
.panel-b {
    grid-area: b;
    clip-path: polygon(0 0, 96% 3%, 100% 100%, 4% 97%);
}

/* Средний широкий блок */
.panel-c {
    grid-area: c;
    clip-path: polygon(0 4%, 100% 0, 100% 96%, 0 100%);
}

/* Нижний левый блок */
.panel-d {
    grid-area: d;
    clip-path: polygon(0 0, 100% 0, 84% 100%, 0 100%);
}

/* Нижний правый блок */
.panel-e {
    grid-area: e;
    clip-path: polygon(16% 0, 100% 0, 100% 100%, 0 100%);
}

/* Hover эффект — мягкий */
.panel:hover {
    filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.6));
    transform: translateY(-3px);
    transition: 0.25s;
}
</style>
