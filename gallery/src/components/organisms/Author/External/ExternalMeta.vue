<template>
    <header class="post-meta">
        <span class="post-date">
            {{ formattedDate }}
        </span>

        <span v-if="pinned" class="post-pinned">
            📌
        </span>
    </header>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    date: String,
    pinned: Boolean
});

const formattedDate = props.date;
</script>


