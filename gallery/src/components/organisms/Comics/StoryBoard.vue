<template>
    <div class="" style="justify-content: flex-start;">
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
