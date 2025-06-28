<template>
    <div class="profile-container" style="overflow: hidden;">
        <div class="author-tabs tags">
            <div class="tags-wrapper" style="">
                <div class="tags-scroll">
                    <div aria-label="tabs example">
                        <div class="btn btn--default" @click="this.showMode = 'images'">Статистика изображений</div>
                    </div>
                    <div aria-label="tabs example">
                        <div class="btn btn--default" @click="this.showMode = 'subonme'">Подписаны на меня</div>
                    </div>
                    <div aria-label="tabs example">
                        <div class="btn btn--default" @click="this.showMode = 'mysubs'">Мои подписки</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-container" v-if="showMode == 'images'">
            <PersonalStatsImages></PersonalStatsImages>
        </div>
        <div class="section-container" v-if="showMode == 'subonme'">
            <GetMySubscribers></GetMySubscribers>
        </div>
        <div class="section-container" v-if="showMode == 'mysubs'">
            <GetMySubscriptions></GetMySubscriptions>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { notifications } from '@main/state';
import PersonalStatsImages from '@gallery/components/organisms/PersonalStatsImages.vue';
import GetMySubscribers from '@gallery/components/organisms/GetMySubscribers.vue';
import GetMySubscriptions from '@gallery/components/organisms/GetMySubscriptions.vue';

export default {
    components:
    {
        PersonalStatsImages,
        GetMySubscribers,
        GetMySubscriptions
    },
    data() {
        return {
            subscriptions: [],
            subscribers: [],
            isLoading: true,
            showMode: ''
        }
    },
    async mounted() {
        try {
            // const response = await axios.get('//furry-world.ru/console/stats/get_user_subscriptions.php');
            // this.subscriptions = response.data.subscriptions || [];
            // this.subscribers = response.data.subscribers || [];
        } catch (error) {
            notifications.generateNotification(
                'Ошибка',
                'Ошибка при загрузке данных подписок. Пожалуйста, попробуйте позже.'
            );
        } finally {
            this.isLoading = false;
        }
    }
}
</script>