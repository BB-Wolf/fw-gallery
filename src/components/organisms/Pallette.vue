<template>
    <section id="pallete_of_day" class="gallery-container pallette" style="margin:0;padding: 0;" v-if="palette">
        <div class="pallette-container">
            <div class="h2" style="padding-left:20px">Палитра дня: {{ palette.paletteTitle }}</div>
            <ul class="colorswatch">
                <li v-for="color in palette.colors" :key="color.name" :style="{ backgroundColor: color.hex }">
                    {{ color.name }} <br />
                    {{ color.hex }}
                </li>

            </ul>
        </div>
    </section>
</template>

<style scoped>
.pallette-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.colorswatch {
    min-height: 40px;
    flex-wrap: wrap;
}

.colorswatch li {
    display: flex;
    text-align: center;
    justify-content: center;
    color: #000;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2);

}
</style>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            palette: null
        }
    },
    async created() {
        const request = await new axios.get('//img-fw.bb-wolf.site/console/get_pallette_of_day.php');
        if (request.data) {
            this.palette = request.data;
        }

    },
}

</script>