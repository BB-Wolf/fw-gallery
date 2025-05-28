<template>
    <div class="day-pallets">
        <div class="day-pallets__header">
            <h1>Палитры дня</h1>
        </div>
        <div class="day-pallets__content">
            <div class="pallete-item">
                <div class="pallete-item item-date">01.01.1960</div>
                <ul class="colorswatch">
                    <li v-for="color in palette.colors" :key="color.name" :style="{ backgroundColor: color.hex }">
                        {{ color.name }} <br />
                        {{ color.hex }}
                    </li>

                </ul>
            </div>
            <div class="pallete-item">
                <div class="pallete-item item-date">01.01.1960</div>
                <ul class="colorswatch">
                    <li v-for="color in palette.colors" :key="color.name" :style="{ backgroundColor: color.hex }">
                        {{ color.name }} <br />
                        {{ color.hex }}
                    </li>

                </ul>
            </div>
            <div class="pallete-item">
                <div class="pallete-item item-date">01.01.1960</div>
                <ul class="colorswatch">
                    <li v-for="color in palette.colors" :key="color.name" :style="{ backgroundColor: color.hex }">
                        {{ color.name }} <br />
                        {{ color.hex }}
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            palette: null,
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
<style scoped>
h1 {
    color: white;
}

.day-pallets {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    color: white;
}
</style>