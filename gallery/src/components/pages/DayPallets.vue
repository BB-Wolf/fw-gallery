<template>
    <div class="day-pallets section-container">
        <div class="day-pallets__header">
            <h1>Палитра дня по датам</h1>
        </div>
        <div class="day-pallets__content mt-20" v-if="palette">
            <div class="palette-set" v-for="item in palette" :key="item">
                <div class="colors">
                    <div v-for="color in item.colors" :key="color" class="color"
                        :style="'background-color:' + color.hex" :data-hex="color.hex">
                    </div>
                    <div class="palette-title">{{ item.title }}</div>
                    <div class="palette-image">
                        <img :src="item.picture" alt="Палитра 2">
                    </div>
                    <div class="palette-day">{{ item.date }}</div>
                </div>
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
        const request = await new axios.get('//furry-world.ru/console/get_pallettes_by_day.php');
        if (request.data) {
            this.palette = request.data;
        }

    },
}

</script>
