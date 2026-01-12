<template>
    <section class="profile-posts-preview">
        <ExternalTelegramPosts />
    </section>
</template>

<script setup>
import ExternalTelegramPosts from '@gallery/components/organisms/Author/External/ExternalPosts.vue';


function formatDate(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}
</script>


