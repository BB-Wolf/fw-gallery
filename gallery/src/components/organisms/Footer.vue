<script>
import FooterBell from '../molecules/FooterBell.vue';
import ModalNotification from '@gallery/components/organisms/ModalNotification.vue';
export default {
    components: {
        FooterBell,
        ModalNotification
    },
    data() {
        return {
            showSwitch: false
        }
    },
    methods: {
        switchMode(mode) {
            window.location.href = '/' + mode + '/';
        }
    },
    mounted() {
        const skipHeight = 800;
        let delta = 115;
        let lastScrollTop = 0;

        const hasScrolled = () => {
            const scrollTop = window.scrollY;

            if (Math.abs(lastScrollTop - scrollTop) <= delta) {
                return;
            }

            if (scrollTop > lastScrollTop && scrollTop > skipHeight) {
                // Scroll down action
                this.showSwitch = true;
            }
            else if (scrollTop < lastScrollTop) {
                // Scroll up action
                this.showSwitch = false;
            }

            lastScrollTop = scrollTop;
        }

        window.addEventListener('scroll', hasScrolled);

    }
}
</script>
<template>
    <section v-show="showSwitch == true" id="switch">
        <div class="switch-container">
            <div class="switch-tab switch-tab--active" @click="switchMode('gallery')" title="gallery">Галерея</div>
            <div class="switch-tab " @click="switchMode('novel')" title='texts'>Тексты</div>
        </div>
    </section>
    <footer>
        <div class="footer-container">
            <div class="footer-item">
                <a href="/gallery/legal/agreement/">Пользовательское соглашение</a>
                <a href="/gallery/legal/">Правила использования сервиса</a>
            </div>
            <div class="footer-item">
                <a href="/gallery/legal/cookie/">Политика конфиденциальности и обработки персональных данных</a>
                <a href="/gallery/legal/cookie/">Политика использования ИИ</a>
            </div>
            <div class="footer-item">
                <a href="/gallery/legal/cookie/">Правила размещения адоптов</a>
                <a href="/gallery/legal/cookie/">Правила размещения Трейдов/YCH</a>
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

