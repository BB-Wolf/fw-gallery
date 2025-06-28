<template>
    <div v-if="this.subList.length > 0">
        <ul>
            <li v-for="item in subList" :key="item.id">
                <div class="sub-item">
                    <div class="sub-info">
                        <a :href="'/gallery/author/' + item.name + '/'">{{ item.name }}</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="subList.length == 0 && !isLoading">
        <div class="no-subscribers">
            <img src="@gallery/assets/images/koshka2.png" alt="Нет подписчиков">
            <div class="h2">Вы пока еще не подписались ни на кого.</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            subList: [],
            isLoading: true
        }
    },
    async mounted() {
        let getSubs = await new axios('https://furry-world.ru/console/stats/get_user_subscriptions.php',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
        if (getSubs.data) {
            this.subList = getSubs.data;
            this.isLoading = false;
        } else {
            this.isLoading = false;
        }
    }
}
</script>
<style scoped>
.no-subscribers {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: white;
    gap: 20px;
}

.sub-info a {
    color: white;
    font-weight: bold;

}

.no-subscribers img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}
</style>