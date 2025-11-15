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

<style scoped>
.watchmore {
    padding-left: 66px !important;
    transition: 0.3s all ease-in;
    position: relative;
}

.watchmore:hover>.arrow {
    position: absolute;
    display: inline-block;
    /* transform: translate(10px, -2px) scale(2.1); */
    transition: 0.3s all ease-in;

}

.pallette-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pallette-container .muted {
    padding-left: 20px;
}

.pallete-box {
    display: block;
    background: #222;
    padding: 16px 20px;
    border-radius: 8px;
    color: #fff;
    text-decoration: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
    transition: box-shadow .25s;
}

.pallete-box:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, .4);
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

li {
    flex: 1;

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
        const request = await new axios.get('//furry-world.ru/console/get_pallette_of_day.php');
        if (request.data) {
            this.palette = request.data;
        }

    },
}

</script>