<template>
    <div class="footer-bell"
        :class="[{ [activeClass]: hasNotification.notificationsCount > 0, [activeBellClass]: hasNotification.notificationsCount > 0 }]">
        <svg :class="[{ [activeBellClass]: hasNotification.notificationsCount }]" fill=" #ffffff" width="60px"
            height="60px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M6 8a6 6 0 1112 0v2.917c0 .703.228 1.387.65 1.95L20.7 15.6a1.5 1.5 0 01-1.2 2.4h-15a1.5 1.5 0 01-1.2-2.4l2.05-2.733a3.25 3.25 0 00.65-1.95V8zm6 13.5A3.502 3.502 0 018.645 19h6.71A3.502 3.502 0 0112 21.5z" />
        </svg>
    </div>
</template>
<script>
import { notifications } from '@/state';
export default {
    data() {
        return {
            hasNotification: notifications,
            activeClass: 'footer-bell--active',
            activeBellClass: 'footer-bell--notification'
        };
    }
}
</script>
<style scoped>
.footer-bell {
    display: flex;
    justify-content: center;
    width: 100px;
    height: 80px;
    position: fixed;
    bottom: -80px;
    right: 80px;
    background-color: rgb(9, 4, 15);
    box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.3);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    opacity: 0.7;
    transition: all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    cursor: pointer;
}

.footer-bell:hover {
    opacity: 1;
    transition: all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.footer-bell--active {
    bottom: 0px;
}

.footer-bell svg {
    margin-top: 10px;
}

.footer-bell svg path {
    fill: #211c1c;
}

.footer-bell--notification svg path {
    fill: orange;
}
</style>