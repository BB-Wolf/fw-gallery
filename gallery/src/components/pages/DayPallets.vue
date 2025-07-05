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
<style scoped>
h1 {
    color: white;
}


.day-pallets__content {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}

.palette-set {
    background-color: #2a2a2a;
    margin-bottom: 30px;
    padding: 15px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.palette-title,
.palette-day {
    color: white;
    font-weight: bold;
    margin: 0 auto;
}

.colors {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;


}

.color {
    width: 50px;
    height: 50px;
    border-radius: 6px;
    border: 1px solid #444;
    box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
}

.palette-image {
    width: 100%;
    max-width: 320px;
    border-radius: 8px;
    border: 1px solid #333;
}

.palette-image img {
    width: 100%;
    object-fit: cover;
}

@media (max-width: 600px) {
    .colors {
        justify-content: center;
        flex-wrap: wrap;

    }

    .color {
        flex: 30%;
    }

    .palette-title {
        flex: 100%;
        text-align: center;
        ;
    }
}

@media (max-width:976px) {
    .day-pallets__content {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>