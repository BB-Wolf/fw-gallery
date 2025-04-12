<script>
import FooterBell from '../molecules/FooterBell.vue';
import ModalNotification from '@gallery/components/organisms/ModalNotification.vue';
import { siteVersion } from '@main/state';
export default {
    components: {
        FooterBell,
        ModalNotification
    },
    methods: {
        switchMode(mode) {
            siteVersion.currentState = mode;
        }
    }
}
</script>
<template>
    <section id="switch">
        <div class="switch-container">
            <div class="switch-tab switch-tab--active" @click="switchMode('gallery')" title="gallery">Галерея</div>
            <div class="switch-tab switch-tab--soon" @click="switchMode('novel')" title='texts'>Тексты</div>
            <div class="switch-tab switch-tab--soon" @click="switchMode('rp')" title='texts'>RP</div>
            <div class="switch-tab switch-tab--soon" @click="switchMode('3d')" title='texts'>3D</div>
        </div>
    </section>
    <footer>
        <div class="footer-container">
            <div class="footer-item">
                <a href="/legal/">Правила и политики использования сервиса</a>
            </div>
            <div class="footer-item">
                <label for="">По всем вопросам и обратной связи:</label>
                <a href="https://t.me/FurryWorldHelpBot">Телеграм: @FurryWorldHelpBot</a>
            </div>
        </div>
    </footer>
    <FooterBell></FooterBell>
    <ModalNotification></ModalNotification>
</template>

<style scoped>
#switch {
    opacity: 0.9;
    position: relative;
    z-index: 99999;

    &:hover {
        opacity: 1;
    }
}

.footer-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    padding: 15px 40px;

}

.footer-item {
    display: flex;
    flex-direction: column;
}

.footer-item label {
    color: white;
    font-size: 16px;
}

.footer-item a {
    color: white;
    font-weight: bold;
    font-size: 16px;
}

@media (max-width:768px) {
    .footer-container {
        min-height: 400px;
        justify-content: flex-start;
    }
}
</style>