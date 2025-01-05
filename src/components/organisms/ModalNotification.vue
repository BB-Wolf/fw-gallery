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
import { notifications } from '@/state';

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

<style scoped>
#notification {
    position: fixed;
    bottom: 0;
    right: 0;
}

.notify-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 480px;
    box-shadow: 0px 0px 2px 5px rgba(255, 255, 255, 0.8);
    right: 15px;
    bottom: 1px;
    background: #1f1f1f;
    overflow-y: scroll;
}

.notification-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-bottom: 2px solid white;
    padding: 10px;
    color: white;
    position: relative;
}

.notification-markread {
order:100000;
}
</style>