<script setup>
import Header from '@novel/components/organisms/Header.vue';
import Footer from '@gallery/components/organisms/Footer.vue';
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

    <Header></Header>
    <router-view v-slot="{ Component, route }">
        <Transition :duration="{ enter: 200, leave: 300 }">
            <component :is="Component" :key="route.path" />
        </Transition>
    </router-view>
    <Footer></Footer>
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