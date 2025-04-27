<script setup>
import Hero from '../organisms/Hero.vue';

</script>
<script>
import { modalState, mobileDevice } from '../../state.js';
import AuthorsOfWeek from '../organisms/AuthorsOfWeek.vue';

export default
    {
        methods:
        {
            closeModal() {
                modalState.isModalVisible = false;
            }
        }

    }</script>

<template>
    <div @click="closeModal()">
        <Hero></Hero>
        <section id="authors-block">
            <AuthorsOfWeek v-if="!mobileDevice.isMobile"></AuthorsOfWeek>
        </section>
    </div>
</template>

<style scoped>
section {
    margin-bottom: 80px;
}

.switch-container {
    margin: 0 auto;
    width: 400px;
    height: 60px;
    border-radius: 25px;
    background-color: white;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 10px;
    justify-content: space-evenly;
    cursor: pointer;
    z-index: 10;
}

.switch-container .switch-tab {
    text-align: center;
    flex: 1;
    height: 50px;
    border-radius: 20px;
    align-self: center;
    transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    color: black;
    align-content: center;
}

.switch-container .switch-tab--active {
    background-color: black;
    color: white;
    transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
</style>