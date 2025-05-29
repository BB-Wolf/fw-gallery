<template>
    <div class="profile-container" style="overflow: hidden;">
        <div class="author-tabs tags">
            <div class="tags-wrapper" style="">
                <div class="tags-scroll">
                    <div aria-label="tabs example">
                        <div class="btn btn--default">Подписаны на меня</div>
                    </div>
                    <div aria-label="tabs example">

                        <div class="btn btn--default">Мои подписки</div>
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
    data() {
        return {
            subscriptions: [],
            subscribers: [],
            isLoading: true,
        }
    },
    async mounted() {
        try {
            const response = await axios.get('//furry-world.ru/console/get_subscriptions.php');
            this.subscriptions = response.data.subscriptions || [];
            this.subscribers = response.data.subscribers || [];
        } catch (error) {
            notifications.generateNotification(
                'error',
                'Ошибка при загрузке данных подписок. Пожалуйста, попробуйте позже.'
            );
        } finally {
            this.isLoading = false;
        }
    }
}
</script>