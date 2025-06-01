<script>
import axios from 'axios';
import MasonryWall from '@yeger/vue-masonry-wall'
import Image from '@gallery/components/atoms/Image.vue';
import { mobileDevice, notifications } from '@main/state';

export default {
    components: {
        MasonryWall,
        Image
    },
    data() {
        return {
            charData: null,
            minColumns: 4,
            responseData: false,
            offset: 1,
            isFinish: false,
            isLoading: false,
            charName: '',
            charShortBio: '',
            charFullBio: '',
            charAge: '',
            charSpecie: '',
            avatarFile: null,
            charAvatar: null,
        }
    },
    async created() {
        if (mobileDevice) {
            this.minColumns = 4;
        } else {
            this.minColumns = 0;
        }
        let characterData = await new axios.get('//furry-world.ru/console/get_character_info.php?user=' + this.$route.params.owner + '&character=' + this.$route.params.character,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }
        );
        if (characterData.data) {
            document.title = "Фурри Мир, Персонаж " + characterData.data.char.name;
            this.charData = characterData.data
            this.charName = characterData.data.char.name;
            this.charShortBio = characterData.data.char.short;
            this.charFullBio = characterData.data.char.full;
            this.charAge = characterData.data.char.age;
            this.charSpecie = characterData.data.char.species;
            this.responseData = true;
        }
    },
    methods: {
        newCharacterAvatar(e) {
            let avatarFile = e.target.files || e.dataTransfer.files;
            this.charAvatar = avatarFile[0];
            this.charData.picture = URL.createObjectURL(this.charAvatar);

        },
        async saveCharacter() {
            let formData = new FormData();
            formData.append('name', this.charName);
            formData.append('age', this.charAge);
            formData.append('species', this.charSpecie);
            formData.append('short', this.charShortBio);
            formData.append('full', this.charFullBio);
            if (this.charAvatar !== null) {
                formData.append('file', this.charAvatar);
            }

            let saveFormData = await new axios.post('//furry-world.ru/console/post_edit_character.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });

            if (saveFormData.data) {
                notifications.generateNotification(saveFormData.data.status, saveFormData.data.text);

            } else {
                notifications.generateNotification('bad', 'Ошибка сохранения персонажа')
            }
        },
        deleteChar() {
            axios.post('//furry-world.ru/console/delete_character.php', {
                user: this.$route.params.owner,
                character: this.$route.params.character
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                if (response.data.success) {
                    this.$router.push('/characters/' + this.$route.params.owner);
                } else {
                    alert('Ошибка при удалении персонажа');
                }
            });
        }
    },
    mounted() {
    }
}
</script>
<template>

    <section id="character">

        <div class="character-container" v-if="this.charData">
            <!-- Character Image -->
            <img :src=this.charData.picture alt="Character Image" class="character-image">

            <div class="author-image">
                <div class="author-image__border">
                    <img :src="this.charData.picture">
                </div>
            </div>
            <div class="grid-container">
                <!-- Character Info -->
                <div class="section-container mt-20">
                    <div class="character-info">
                        <!-- Character Image -->
                        <div @click="$refs.characterImage.click()" class="btn btn-default">
                            Нажмите чтобы загрузить изображение
                            <input type="file" ref="characterImage" style="display: none" @change="newCharacterAvatar">
                        </div>
                        <div id="character-name">
                            <label for="character-name mt-40">Имя персонажа:</label>
                            <input type="text" v-model="charName">
                        </div>
                        <div id="character-age"><label>Вид:</label><input type="text" v-model="charSpecie">
                        </div>
                        <div id="character-age"><label>Возраст:</label><input type="text" v-model="charAge">
                        </div>
                        <div id="character-age"><label>Короткое описание:</label><textarea
                                v-model="charShortBio"></textarea></div>
                    </div>
                </div>
                <!-- Character Full Bio -->
                <div class="section-container">

                    <div class="character-bio">
                        <h2>Полное Био</h2>
                        <div id="character-full-bio">
                            <textarea v-model="charFullBio"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="character-gallery">
                <div class="section-container" style="display:flex;gap:20px;">
                    <div class="btn btn--success" @click="saveCharacter">Сохранить</div>
                    <div class="btn btn--danger" @clic="deleteChar">Удалить</div>
                </div>
            </div>
        </div>
    </section>

</template>
<style scoped>
textarea {
    width: 100%;
    min-height: 300px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    padding: 10px
}

input[type="text"] {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
}

.section-container,
.character-gallery {
    width: 100%;
    max-width: 1900px;
    margin: 0 auto;
    padding: 20px;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    padding: 20px;
    width: 100%;
}

.character-container {
    width: 100%;
    max-width: 1900px;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: white;
}

.character-image {
    width: 100%;
    max-height: 600px;
    height: 600px;
    object-fit: cover;
    object-position: 0% 10%;
}

.character-info {
    padding: 40px 20px 20px 20px;
    text-align: left;
    color: white;
}

.character-info h1 {
    margin: 10px 0;
    font-size: 24px;
    color: white;
}

.character-info p {
    margin: 5px 0;
    font-size: 16px;
    color: #ffffff;
}

.character-bio {
    width: 100%;
    padding: 20px;
    color: white;
}

.character-bio h2 {
    margin-bottom: 10px;
    font-size: 20px;
    color: white;
}

.character-bio p {
    font-size: 16px;
    color: white;
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

.gallery-wrapper {
    padding: 0 20px;
    margin: 0 auto;
}

.gallery-grid {
    /* columns: 250px;
    column-gap: 20px; */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;

}

.gallery-item {
    width: 300px;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    height: fit-content;

}

.gallery-item img {
    max-width: 100%;
    object-fit: cover;

}

.gallery-item__hover--top,
.gallery-item__hover {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    width: 100%;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.gallery-item__hover--top {
    top: -1000px;
}

.gallery-item__hover {
    bottom: -1000px;

}

.gallery-item:hover>.gallery-item__hover--top {
    top: -10px;
}


.gallery-item:hover>.gallery-item__hover {
    bottom: 0;
}

.gallery-item__hover a {
    color: white;
}

@media only screen and (max-width:600px) {
    .gallery-item {
        width: 100%;
    }

    .gallery-wrapper {
        padding: 0;
    }
}

.wait-container {
    flex: 100%;
    text-align: center;
    display: none;
}

.wait-container--active {
    display: block;
}

@media (max-width:760px) {
    .grid-container {
        display: grid;
        grid-template-columns: auto;
    }
}
</style>
