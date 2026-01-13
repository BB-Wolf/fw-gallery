<template>
    <div class="" style="justify-content: flex-start;">
        <div class="h2">Новые выпуски комиксов</div>
    </div>
    <section class="storyboard-container storyboard-tags">
        <div class="tags-wrapper">
            <div class="tags-scroll">
                <a :href="item.link" class="panel" v-for="(item, index) in comics" :key="item.id"
                    :class="panelClass(index)" :style="{ '--bg-image': 'url(\'' + item.preview + '\')' }">
                    <div class="gallery-item__hover">
                        <div class="gallery-item__title">
                            <a :href="item.link" class="text-white font-bold">{{ item.title }}</a>
                        </div>
                        <div class="gallery-item__author">
                            <b>Автор:</b><a :href="'/gallery/author/' + item.userName" class="text-white font-bold">{{
                                item.userName }}</a>
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
.storyboard-tags {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 20px 0px;
    min-height: 90px;
    gap: 20px;
    background-color: #2c2c2c;
}

.storyboard-tags .panel {
    /* Reduce size by ~30% from 520x680 -> 364x476 */
    width: 364px !important;
    height: 476px !important;
    background: transparent !important;
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.storyboard-tags .panel::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    filter: blur(10px) brightness(0.7);
    z-index: -2;
}

.storyboard-tags .panel::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--bg-image);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
}
</style>
