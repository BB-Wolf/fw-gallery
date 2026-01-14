<template>
    <div class="adopts-list">
        <div class="character-container">
            <div class="text-2xl text-white">Ваши адопты</div>
            <div v-if="loading" class="text-center text-gray-500">Загрузка...</div>
            <div v-else-if="adopts.length === 0" class="text-center text-gray-500">У вас пока нет адоптов</div>
            <div v-else class="image-grid">
                <div class="image-item" v-for="adopt in adopts" :key="adopt.id">
                    <a :href="adopt.link">
                        <img :src="adopt.preview || adopt.picture" class="adopt-preview" alt="Adopt preview" />
                    </a>
                    <div class="adopt-info">
                        <div class="font-bold">{{ adopt.name }}</div>
                        <div class="text-sm">{{ adopt.price }} {{ adopt.currency || '₽' }}</div>
                        <div class="text-xs text-gray-400">{{ adopt.status }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdoptsList',
    data() {
        return {
            adopts: [],
            loading: false
        }
    },
    methods: {
        async fetchAdopts() {
            this.loading = true;
            try {
                const response = await axios.get('//furry-world.ru/console/adopts/get_user_adopts.php', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data && Array.isArray(response.data)) {
                    this.adopts = response.data;
                } else if (response.data && response.data.adopts) {
                    this.adopts = response.data.adopts;
                } else {
                    this.adopts = [];
                }
            } catch (error) {
                console.error('Error fetching adopts:', error);
                this.adopts = [];
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.fetchAdopts();
    }
}
</script>

<style scoped>
.adopt-preview {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
}

.adopt-info {
    padding: 8px 0;
}
</style>
