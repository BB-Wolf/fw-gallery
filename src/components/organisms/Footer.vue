<script>
import FooterBell from '../molecules/FooterBell.vue';
import ModalNotification from './ModalNotification.vue';
export default {
    components: {
        FooterBell,
        ModalNotification
    },
}
</script>
<template>
    <section id="switch">
        <div class="switch-container">
            <div class="switch-tab switch-tab--active" title="gallery">Галерея</div>
            <div class="switch-tab" title='texts'>Тексты</div>
            <div class="switch-tab" title="3d">3D</div>
            <div class="switch-tab" title="rp">RP</div>
        </div>
    </section>
    <footer></footer>
    <FooterBell></FooterBell>
    <ModalNotification></ModalNotification>
</template>

<style scoped></style>