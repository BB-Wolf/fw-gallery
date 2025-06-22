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
                    <img :src="item.preview">
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
}

.artofday-item {
    padding: 10px;
}
</style>
