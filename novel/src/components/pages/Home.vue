<script setup>
import Hero from '../organisms/Hero.vue';
</script>
<script>
import { modalState, mobileDevice } from '../../state.js';
import AuthorsOfWeek from '../organisms/AuthorsOfWeek.vue';
import AuthorsOfWeekMobile from '../organisms/AuthorsOfWeekMobile.vue';
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Multiselect from '@vueform/multiselect';

export default
    {
        components: {
            EditorContent,
            Multiselect
        },
        methods:
        {
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
            }
        }, data() {
            return {
                editor: null,
                charList: '',
                genre: '',
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
                showCover: false
            }
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
        <section id="authors-block" class="section-container">
            <AuthorsOfWeek v-if="!mobileDevice.isMobile"></AuthorsOfWeek>
        </section>
        <section id="new-stories">
            <div class="tab-block">
                <div class="btn block-btn block-btn--active">Основное</div>
                <div class="btn block-btn" @click="switchTab($event, 'cover')">Обложка</div>
                <div class="btn block-btn" @click="switchTab($event, 'character')">Персонажи</div>
                <div class="btn block-btn" @click="switchTab($event, 'genre')">Жанр</div>
                <div class="btn block-btn" @click="switchTab($event, 'rate')">Рейтинг</div>
            </div>
            <div class="content-block">
                <div class="tab__title mt-20 mb-20">Редактор текста</div>
                <div class="tab__character" v-if="showCover">
                    <label>Загрузите обложку </label>
                    <img :src="cover">
                    <div class="btn btn--warning" @click="this.$refs.file.click()">Загрузить изображение</div>
                    <input type="file" ref="file">
                </div>
                <div class="tab__character" v-if="showCharacter">
                    <label>Список персонажей, указывайте через запятую </label>
                    <input type="text" v-model="charList">
                </div>
                <div class="tab__rate" v-if="showRate">
                    <label for="">Рейтинг</label>
                    <Multiselect :options="rate"></Multiselect>
                </div>
                <div class="tab__type" v-if="showGenre">
                    <label>Жанр</label>
                    <input type="text" v-model="genre">
                    <label>Фэндом</label>
                    <input type="text" v-model="fandom">
                </div>
                <div class="tab_setting" v-if="showSetting">
                    <label for="">Сеттинг</label><input type="text" v-model="setting">
                </div>
                <div class="mt-60">
                    <editor-content :content="''" :editor="editor" />
                </div>
                <div class="btn btn--info mt-20" @click="saveDraft">Сохранить в черновик</div>
                <div class="btn btn--success mt-20" @click="saveWork">Сохранить</div>
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
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
