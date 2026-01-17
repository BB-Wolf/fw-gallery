<template>
    <div class="manage-trades">
        <div class="header-actions mb-8">
            <h1 class="text-3xl font-bold">Управление Ych/Trades</h1>
            <div class="tabs-switcher mt-4">
                <button @click="activeView = 'list'" class="btn mr-2"
                    :class="activeView === 'list' ? 'btn-primary' : 'btn-default'">
                    Мои предложения
                </button>
                <button @click="activeView = 'create-trade'" class="btn mr-2"
                    :class="activeView === 'create-trade' ? 'btn-primary' : 'btn-default'">
                    Создать Трейд
                </button>
                <button @click="activeView = 'create-ych'" class="btn"
                    :class="activeView === 'create-ych' ? 'btn-primary' : 'btn-default'">
                    Создать YCH
                </button>
            </div>
        </div>

        <section id="trades-content">
            <div v-if="activeView === 'list'" class="character-container character-container__right">
                <TradesList ref="tradesList" />
            </div>

            <div v-if="activeView === 'create-trade'" class="form-container max-w-4xl">
                <TradeCreate @created="onCreated" />
            </div>

            <div v-if="activeView === 'create-ych'" class="form-container max-w-4xl">
                <YCHCreate @created="onCreated" />
            </div>
        </section>
    </div>
</template>

<script>
import { TradeCreate } from '@gallery/features/trade-create';
import { YCHCreate } from '@gallery/features/ych-create';
import TradesList from './TradesList.vue';

export default {
    name: 'ManageTrades',
    components: {
        TradeCreate,
        YCHCreate,
        TradesList
    },
    data() {
        return {
            activeView: 'list'
        }
    },
    methods: {
        onCreated() {
            this.activeView = 'list';
            this.$nextTick(() => {
                if (this.$refs.tradesList) {
                    this.$refs.tradesList.fetchTrades();
                }
            });
        }
    }
}
</script>

<style scoped>
.manage-trades {
    padding: 1rem;
}

.tabs-switcher {
    display: flex;
    gap: 10px;
}

.form-container {
    margin: 0 auto;
}

.btn-primary {
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white;
}
</style>
