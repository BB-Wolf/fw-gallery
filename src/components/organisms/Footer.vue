<script>
import FooterBell from '../molecules/FooterBell.vue';
import ModalNotification from './ModalNotification.vue';
import { siteVersion } from '@/state';
export default {
    components: {
        FooterBell,
        ModalNotification
    },
    methods: {
        switchMode(mode)
        {
                siteVersion.currentState = mode;
        }
    }
}
</script>
<template>
    <section id="switch">
        <div class="switch-container">
            <div class="switch-tab switch-tab--active" @click="switchMode('gallery')" title="gallery">Галерея</div>
            <div class="switch-tab" @click="switchMode('novel')" title='texts'>Тексты</div>
        </div>
    </section>
    <footer>
        <div class="footer-container">
            <div class="footer-item">
                <a href="/legal/">Правила и политики</a>
            </div>
        </div>
    </footer>
    <FooterBell></FooterBell>
    <ModalNotification></ModalNotification>
</template>

<style scoped>
.footer-container {
    display: flex;
    justify-content:space-between;
    flex-direction:column;
    flex-wrap:wrap;
    width:100%;
    padding:15px 20px;
}
</style>