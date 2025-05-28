<script setup>
import Header from '@gallery/components/organisms/Header.vue';
import Footer from '@gallery/components/organisms/Footer.vue';
import CookiePolicy from '@main/components/organisms/CookiePolicy.vue';
import { allowedCookie } from '@main/state';
</script>
<script>
export default
    {
        created() {
            //   isUserLogged.vaildate();
        }
    }
</script>

<template :click="closeModal()">

    <slot>
        <Header></Header>
    </slot>
    <router-view v-slot="{ Component, route }">
        <Transition :duration="{ enter: 200, leave: 300 }">
            <component :is="Component" :key="route.path" />
        </Transition>
    </router-view>
    <slot>
        <Footer></Footer>
    </slot>
    <CookiePolicy v-if="allowedCookie.allowed != 1"></CookiePolicy>

</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>