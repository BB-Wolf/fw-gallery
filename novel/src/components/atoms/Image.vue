<template>
<img :class="this.imageClass" :src="this.imageSrc" :alt="this.imageAlt" :title="this.imageTitle">
</template>

<script>
export default {
 props: ['imageClass','imageSrc','imageTitle','imageAlt']
}
</script>