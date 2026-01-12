<template>
    <section id="notification" v-show="notificationData.showNotificationModal">
        <div class="notify-container">
            <div class="notification-item" v-for="notification in notificationData.notificationList"
                :key="notification.title">
                <div class="notify-title">{{ notification.title }}</div>
                <div class="notify-body">{{ notification.body }}</div>
            </div>
            <div class="notification-markread btn btn--default" @click="markRead">Очистить и закрыть окно</div>
        </div>
    </section>
</template>
<script>
import { notifications } from '@main/state';

export default {
    data() {
        return {
            notificationData: notifications
        }
    },
    methods: {
        markRead() {
            notifications.notificationList = [];
            notifications.notificationsCount = 0;
            notifications.showNotificationModal = false;
        }
    }
}
</script>


