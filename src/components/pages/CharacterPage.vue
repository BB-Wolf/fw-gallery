<script>
import axios from 'axios';
export default {
    data() {
        return {
            charData:null
        }
    },
    async created() {
        let characterData =  await new axios.get('//furry-world.ru/console/get_character_info.php?user='+this.$route.params.owner+'&character=' + this.$route.params.character);
        if (characterData.data) {
            this.charData = characterData.data
        }
    }
}
</script>
<template>

    <section id="character">

        <div class="character-container" v-if="this.charData">
            <!-- Character Image -->
            <img :src=this.charData.picture
                alt="Character Image" class="character-image">

            <div class="author-image">
                <div class="author-image__border">
                    <img :src="this.charData.picture">
                </div>
            </div>
            <!-- Character Info -->
            <div class="character-info">
                <h1 id="character-name">{{ this.charData.char.name }}</h1>
                <p id="character-age">Вид: {{this.charData.char.specie}}</p>
                <p id="character-age">Возраст: {{this.charData.char.age}}</p>
                <p id="character-short-bio">{{this.charData.char.short}}</p>
            </div>

            <!-- Character Full Bio -->
            <div class="character-bio">
                <h2>Полное Био</h2>
                <p id="character-full-bio">
                    {{this.charData.char.full}}
                </p>
            </div>

            <div class="character-gallery">
                <h2>Галерея персонажа</h2>
            </div>
        </div>
    </section>

</template>
<style scoped>
.character-container {
    width: 100%;
    max-width: 1900px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.character-image {
    width: 100%;
    max-height: 600px;
    object-fit: cover;
    object-position: 0% 10%;
}

.character-info {
    padding: 20px;
    text-align: center;
}

.character-info h1 {
    margin: 10px 0;
    font-size: 24px;
}

.character-info p {
    margin: 5px 0;
    font-size: 16px;
    color: #555;
}

.character-bio {
    width: 100%;
    padding: 20px;
}

.character-bio h2 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
}

.character-bio p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
}

@media (max-width: 600px) {
    .character-info h1 {
        font-size: 20px;
    }

    .character-info p,
    .character-bio p {
        font-size: 14px;
    }

    .character-bio h2 {
        font-size: 18px;
    }

    .author-image {
        display: none;
    }
}


.author-image__border {
    border-radius: 50%;
    overflow: hidden;
    width: 200px;
    height: 200px;
    border: 1px solid #ededed;
    margin: 10px auto;
    position: absolute;
    left: 60px;
    top: 480px;
}

.author-image__border img {

    max-width: 100%;
}
</style>
