<template>
    <section id="pallete_of_day" class="gallery-container pallette" style="margin:0;padding: 0;" v-if="palette">
        <div class="pallette-container">
            <div class="h2" style="padding-left:66px">Палитра дня: {{
                palette.paletteTitle
            }}
            </div>
            <a :href="'/gallery/pallete_of_a_day/'" class="watchmore muted">Палитра дня по датам
                <span class="arrow">→</span></a>
            <ul class="colorswatch mt-10">
                <li v-for="color in palette.colors" :key="color.name" :style="{ backgroundColor: color.hex }">
                    {{ color.name }} <br />
                    {{ color.hex }}
                </li>

            </ul>
        </div>
    </section>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            palette: null
        }
    },
    async created() {
        const request = await new axios.get('//furry-world.ru/console/get_pallette_of_day.php');
        if (request.data) {
            this.palette = request.data;
        }

    },
}

</script>