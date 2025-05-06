<script>
import { modalState, mobileDevice, notifications } from '@main/state.js';
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Multiselect from '@vueform/multiselect';
import axios from 'axios';

export default
    {
        components: {
            EditorContent,
            Multiselect
        },
        methods:
        {
            buildPreview(e) {
                let file = e.target.files || e.dataTransfer.files;
                if (!file.length) {
                    notifications.generateNotification('bad', 'Ошибка загрузки изображения');

                    return;
                }
                this.cover = file[0];
                this.coverRaw = URL.createObjectURL(new File(file, file.name));
            },
            closeModal() {
                modalState.isModalVisible = false;
            },
            switchTab(btn, e) {
                if (btn.target.classList.contains('block-btn--active')) {
                    btn.target.classList.remove('block-btn--active');
                } else {
                    btn.target.classList.add('block-btn--active');
                }
                if (e == 'rate') this.showRate = !this.showRate;
                if (e == 'genre') this.showGenre = !this.showGenre;
                if (e == 'character') this.showCharacter = !this.showCharacter;
                if (e == 'cover') this.showCover = !this.showCover;
            },
            saveDraft() {
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('description', this.description);
                formData.append('text', this.editor.getHTML());
                formData.append('tags', this.tags);
                formData.append('setting', this.setting);
                formData.append('genre', this.genre);
                formData.append('fandom', this.fandom);
                formData.append('charList', this.charList);
                formData.append('rate', this.rate);
                formData.append('draft', 'y');

                if (this.coverRaw) {
                    formData.append('cover', this.cover);
                }

                axios.post(`//furry-world.ru/console/novel/post_add_draft.php`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    if (response.data.status == 'success') {
                        notifications.generateNotification('Успех', 'Черновик успешно сохранен');
                    } else {
                        notifications.generateNotification('Ошибка', response.data.message);
                    }
                });
            },
            saveWork() {
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('text', this.editor.getHTML());
                formData.append('tags', this.tags);
                formData.append('setting', this.setting);
                formData.append('genre', this.genre);
                formData.append('fandom', this.fandom);
                formData.append('charList', this.charList);
                formData.append('rate', this.rate);

                if (this.coverRaw) {
                    formData.append('cover', this.coverRaw);
                }

                axios.post(`//furry-world.ru/console/novel/post_add_novel.php`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    console.log(response.data);
                    if (response.data == 'ok') {
                        modalState.isModalVisible = false;
                    }
                });
            },
        },
        data() {
            return {
                editor: null,
                title: '',
                description: '',
                charList: '',
                genre: [],
                fandom: '',
                cover: null,
                coverRaw: null,
                rate: [0, 12, 16, 18, 21],
                setting: null,
                activeTab: 'main',
                showGenre: false,
                showRate: false,
                showFandom: false,
                showSetting: false,
                showCharacter: false,
                showCover: false,
                pairing: '',
                genres: [],
                fandoms: []
            }
        },

        async created() {
            let genresData = await axios.get(`//furry-world.ru/console/novel/get_novel_genres.php`);
            // let fandomsData = await axios.get(`//furry-world.ru/console/novel/get_novel_fandoms.php`);
            if (genresData.data) {
                this.genres = genresData.data;
            }
            // if (fandomsData.data) {
            //     this.fandoms = fandomsData.data;
            // }
        },
        mounted() {
            this.editor = new Editor({
                content: "Начните писать текст...",
                extensions: [StarterKit],
            })
        },

        beforeUnmount() {
            this.editor.destroy()
        },


    }</script>

<template>
    <div @click="closeModal()">
        <section id="new-stories">
            <div class="tab-block">
                <div class="btn block-btn block-btn--active">Основное</div>
                <div class="btn block-btn" @click="switchTab($event, 'cover')">Обложка</div>
                <div class="btn block-btn" @click="switchTab($event, 'character')">Персонажи</div>
                <div class="btn block-btn" @click="switchTab($event, 'genre')">Жанр/Пейринг</div>
                <div class="btn block-btn" @click="switchTab($event, 'rate')">Рейтинг</div>
            </div>
            <div class="content-block">

                <div class="tab__character mt-20 mb-20 section-container">
                    <div class="muted">Рассказы без указанного рейтинга автоматически будут отмечены 18+</div>
                    <label>Название рассказа (максимум 200 символов)</label>
                    <input type="text" v-model="title" maxlength="200">
                    <label>Описание рассказа (максимум 1000 символов)</label>
                    <textarea v-model="description" maxlength="1000"></textarea>
                </div>

                <div class="tab__character mt-20 section-container" v-if="showCover">
                    <label v-if="cover == null">Загрузите обложку </label>
                    <img class="cover" :src="this.coverRaw">
                    <div class="btn btn--warning" @click="this.$refs.file.click()">Загрузить изображение</div>
                    <input type="file" @change="buildPreview" ref="file">
                </div>
                <div class="tab__character mt-20 section-container" v-if="showCharacter">
                    <label>Список персонажей, указывайте через запятую </label>
                    <input type="text" v-model="charList">
                </div>
                <div class="tab__rate mt-20 section-container" v-if="showRate">
                    <label for="">Рейтинг</label>
                    <Multiselect :options="rate"></Multiselect>
                </div>
                <div class="tab__type mt-20 section-container" v-if="showGenre">
                    <label>Жанр</label>
                    <Multiselect searchable="true" mode="multiple" :options="genres" v-model="genre"></Multiselect>
                    <div class="mt-20" style="display: flex; flex-wrap: nowrap; gap: 10px;">
                        <div v-for="astag in genre" :key="astag" class="btn">{{ astag }}</div>
                    </div>
                    <label>Пейринг</label>
                    <input type="text" v-model="pairing">
                </div>
                <div class="mt-10 section-container">
                    <editor-content :content="''" :editor="editor" />
                    <div class="btn btn--info mt-20" @click="saveDraft">Сохранить в черновик</div>
                    <div class="btn btn--success mt-20" @click="saveWork">Сохранить</div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
section {
    color: white;
}

input[type="file"] {
    display: none;
}

.multiselect {
    color: black;
}

.tab-block {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.tab-block .btn {
    border-radius: 1px;
}

.tab-block .block-btn {
    background: #4f4f4f;
}

.tab-block .block-btn:hover {
    background: white;
}

.tab-block .block-btn--active {
    background: white;
}



.section-container {
    max-width: 95%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

}

#new-stories {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    padding: 0 20px;
}

.right-block__tab {
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
}

.right-block__tab .tab__title {
    padding: 0 10px;
    color: white;
    background: rgba(255, 255, 255, 0.3);
}

.mt-60 {
    margin-top: 60px;
}

.cover {
    width: 200px;
    object-fit: cover;
    border-radius: 8px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>