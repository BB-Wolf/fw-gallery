<template>
    <div class="trades-list">
        <div v-if="loading" class="flex justify-center p-12">
            <div class="loader"></div>
        </div>

        <div v-else-if="trades.length === 0" class="empty-state">
            <p>У вас пока нет созданных трейдов.</p>
        </div>

        <div v-else class="image-grid">
            <div class="image-item" v-for="item in trades" :key="item.ID">
                <div class="trade-card card relative">
                    <div class="status-badge" :class="item.UF_IS_COMPLETED == 1 ? 'status--closed' : 'status--open'">
                        {{ item.UF_IS_COMPLETED == 1 ? 'Завершено' : 'Активно' }}
                    </div>

                    <a
                        :href="'/gallery/trade/author/' + item.USER_LOGIN + '/trade/' + item.UF_CODE + '/' + item.ID + '/'">
                        <img :src="item.UF_PREVIEW_IMAGE || item.UF_IMAGE_SRC" class="trade-preview" />
                    </a>

                    <div class="trade-info p-4">
                        <div class="trade-title font-bold">{{ item.UF_TITLE }}</div>
                        <div class="trade-dates text-sm text-gray-400 mt-1">
                            {{ item.UF_DATE_START }} — {{ item.UF_DATE_END }}
                        </div>
                        <div class="trade-actions mt-4 flex gap-2">
                            <a :href="'/gallery/trade/author/' + item.USER_LOGIN + '/trade/' + item.UF_CODE + '/' + item.ID + '/edit/'"
                                class="btn btn-sm btn-default flex-1 text-center">Редактировать</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { notifications } from '@main/state';

export default {
    name: 'TradesList',
    data() {
        return {
            trades: [],
            loading: false
        }
    },
    created() {
        this.fetchTrades();
    },
    methods: {
        async fetchTrades() {
            this.loading = true;
            try {
                // Using a hypothetical endpoint for user trades list
                const response = await axios.get('//furry-world.ru/console/trades/get_user_trades.php', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                if (response.data && Array.isArray(response.data)) {
                    this.trades = response.data;
                }
            } catch (error) {
                console.error('Error fetching trades:', error);
                // notifications.generateNotification('Ошибка', 'Не удалось загрузить список трейдов');
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.trade-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.trade-card:hover {
    transform: translateY(-5px);
}

.trade-preview {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.status-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: bold;
    z-index: 1;
}

.status--open {
    background: #10b981;
    color: white;
}

.status--closed {
    background: #6b7280;
    color: white;
}

.empty-state {
    text-align: center;
    padding: 3rem;
    color: #94a3b8;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
}

@media (max-width: 640px) {
    .image-grid {
        grid-template-columns: 1fr;
    }
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
}

@media (max-width: 640px) {
    .image-grid {
        grid-template-columns: 1fr;
    }
}

.loader {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top-color: #6366f1;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
