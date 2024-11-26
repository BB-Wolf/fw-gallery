<template>
    <ul :class="this.parentClass">
        <li :class="this.listClass" v-for="list in this.listData">
            <a v-if="list.link" href="list.link">{{ list.linkText }}</a>
            <span v-else>{{ list.linkText }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['parentClass', 'listClass', 'listData']
}
</script>