<template>
    <h2>Работа дня</h2>
    <div class="muted">Загружайте Ваши работы выполненые в течение дня с тегом <b
            style="color:white;"><i>#АртДня</i></b>.<br />
        Лучшие
        работы по количеству отметок Нравится, загруженные до 23.00 по
        МСК будут отмечены</div>
    <div class="tags-wrapper">
        <div class="tags-scroll">
            <div class="artofday" v-show="this.worksList.length > 0">
                <div v-for="item in worksList" :key="item" class="artofday-item">
                    <div class="image-item__hover--top">
                        <div class="image-item__author" style="height:0px; position: relative;">
                            <div class="fav-bookmark" @click="saveToFav($event.target, item.id)">
                                <svg fill="#000000" width="60px" height="60px" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <a :href="item.link">
                        <img :src="item.preview">
                    </a>
                    <div class="image-item__hover">
                        <div class="image-item__author"><a :href="item.link">{{ item.title }}</a></div>
                        <div class="image-item__title"><b>Автор:</b> <a :href="'/author/' + item.userName">{{
                            item.userName }}</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            worksList: []
        }
    },
    async mounted() {
        let getWorks = await new axios('https://furry-world.ru/console/get_artofaday.php',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        );
        if (getWorks.data) {
            this.worksList = getWorks.data;
        }
    },
    methods: {
        async saveToFav(elm, id) {
            const addImg = await axios.get('//furry-world.ru/console/get_save_to_fav.php?id=' + id);
            if (addImg.data) {
                elm.parentNode.parentNode.classList.toggle('fav-bookmark--active');
                //
            } else {
                // handle global notifications
            }
        }
    }
}
</script>

<style scoped>
h2 {
    color: white;
}

.artofday {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
}

.artofday-item {
    padding: 0px;
    position: relative;
    overflow: hidden;
}

.artofday-item:hover>.image-item__hover {
    bottom: 0px;
}

.artofday-item:hover>.image-item__hover--top {
    bottom: unset;
    top: 0px;
}

.image-item__hover--top:hover {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.365, 1);
    top: -10px !important;
}

.image-item__hover,
.image-item__hover--top {
    display: flex;
    position: absolute;
    bottom: -1000px;
    background-color: rgba(0, 0, 0, .4);
    max-width: 460px;
    width: 100%;
    margin: 0 auto;
    height: auto;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    color: white;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.artofday-item a {
    color: white;
    font-weight: bold;
}
</style>
