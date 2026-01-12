<script>
import axios from 'axios';
import MasonryWall from '@yeger/vue-masonry-wall'
import Image from '@gallery/components/atoms/Image.vue';
import { mobileDevice, notifications } from '@main/state';
import AutosaveModal from '@gallery/components/molecules/AutosaveModal.vue';

export default {
    components: {
        MasonryWall,
        Image,
        AutosaveModal
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
            characterHeaderRaw: null,
            characterHeader: null,
            isMentionable: 0,
            isTradable: 0,
            showActionModal: false,
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
        newCharacterHeader(e) {
            let avatarFile = e.target.files || e.dataTransfer.files;
            this.characterHeader = avatarFile[0];
            this.characterHeaderRaw = URL.createObjectURL(new File(avatarFile, avatarFile.name))
            this.charData.header = this.characterHeaderRaw

        },
        async saveCharacter() {
            this.showActionModal = true;
            let formData = new FormData();
            formData.append('name', this.charName);
            formData.append('age', this.charAge);
            formData.append('species', this.charSpecie);
            formData.append('short', this.charShortBio);
            formData.append('full', this.charFullBio);
            formData.append('ismentionable', this.isMentionable);
            formData.append('istradeable', this.isTradable);

            if (this.charAvatar !== null) {
                formData.append('file', this.charAvatar);
            }
            if (this.charHeader !== null) {
                formData.append('charheader', this.characterHeader);
            }

            let saveFormData = await new axios.post('//furry-world.ru/console/post_edit_character.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });

            if (saveFormData.data) {
                notifications.generateNotification('Успех', saveFormData.data.text);

            } else {
                notifications.generateNotification('Ошибка', 'Ошибка сохранения персонажа')
            }
            this.showActionModal = false;
        },
        async deleteChar() {
            let sendRequest = await new axios.post('//furry-world.ru/console/post_edit_character.php', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
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
        <AutosaveModal v-if="this.showActionModal" :saveText="'Сохраняем...'"></AutosaveModal>
        <div class="character-container" v-if="this.charData">
            <!-- Character Image -->
            <img :src=this.charData.header alt="Character Image" class="character-image">

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
                            Нажмите чтобы загрузить изображение персонажа
                            <input type="file" ref="characterImage" style="display: none" @change="newCharacterAvatar">
                        </div>
                        <div @click="$refs.characterHeader.click()" class="btn btn-default mt-20">
                            Нажмите чтобы загрузить шапку персонажа
                            <input type="file" ref="characterHeader" style="display: none" @change="newCharacterHeader">
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

