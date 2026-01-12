<script setup>
import Header from './components/organisms/Header.vue';
import Footer from './components/organisms/Footer.vue';
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

