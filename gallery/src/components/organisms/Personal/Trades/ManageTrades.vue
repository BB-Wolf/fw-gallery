<template>
    <div class="manage-trades">
        <div class="h1">Управление Ych/Trades</div>
        <div class="form-header mb-6">
            <div class="btn-group flex gap-2">
                <button @click="activeType = 'trade'" class="btn"
                    :class="activeType === 'trade' ? 'btn--trade' : 'btn--default'">
                    Создать Трейд
                </button>
                <button @click="activeType = 'ych'" class="btn"
                    :class="activeType === 'ych' ? 'btn--ych' : 'btn--default'">
                    Создать YCH
                </button>
            </div>
        </div>
        <section id="manage-trades" class="flex flex-col lg:flex-row gap-8 align-start">
            <!-- Creation Section -->
            <div class="character-container flex-1 min-w-[350px]">


                <div class="form-wrapper">
                    <TradeCreate v-if="activeType === 'trade'" @created="onCreated" />
                    <YCHCreate v-if="activeType === 'ych'" @created="onCreatedYch" />
                </div>
            </div>

            <!-- List Section -->
            <div class="character-container character-container__right flex-[1.5] mt-20">
                <div class="h2 mb-4 text-white">Мои предложения</div>
                <TradesList ref="tradesList" v-if="activeType === 'trade'" />
                <YchList ref="ychList" v-if="activeType === 'ych'" />
            </div>
        </section>
    </div>
</template>

<script>
import { TradeCreate } from '@gallery/features/trade-create';
import { YCHCreate } from '@gallery/features/ych-create';
import YchList from './YchList.vue';
import TradesList from './TradesList.vue';

export default {
    name: 'ManageTrades',
    components: {
        TradeCreate,
        YCHCreate,
        TradesList,
        YchList
    },
    data() {
        return {
            activeType: 'trade'
        }
    },
    methods: {
        onCreated() {
            if (this.$refs.tradesList) {
                this.$refs.tradesList.fetchTrades();
            }
        },
        onCreatedYch() {
            if (this.$refs.ychList) {
                this.$refs.ychList.fetchTrades();
            }
        }
    }
}
</script>

<style scoped>
#manage-trades {
    display: flex;
    gap: 30px;
    align-items: flex-start;
}

.character-container__right {
    flex: unset;
    background-color: #2b2b2b;
    width: 1450px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

@media (max-width: 1200px) {
    #manage-trades {
        flex-direction: column;
    }

    .character-container {
        width: 100%;
    }
}

.btn--success {
    background: #28a745;
    color: white;
}

.btn--default {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.btn {
    padding: 0.5rem 1rem;
    border-radius: 0.1rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
}

.btn:hover {
    filter: brightness(1.1);
}

.btn--trade {
    background: linear-gradient(135deg, #6366f1, #a855f7);
}

.btn--ych {
    background: linear-gradient(135deg, #f59e0b, #ef4444);
}
</style>
