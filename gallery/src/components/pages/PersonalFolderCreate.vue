<template>
    <div class="profile-container d-flex g-20 flex-wrap">
        <div class="left-block">
            <div class="h2">{{ this.folderName }}</div>
            <img style="max-width: 320px;" :src="this.folderPicturePreview" class="folderImage">
            <div class="form-group">
                <label>Загрузить изображение</label>
                <input type="file" name="folderNewImage" @change="newFolderImage">
            </div>
        </div>
        <div class="right-block">
            <div class="group">
                <label>Название</label>
                <input type='text' v-model="folderName">
            </div>
            <div class="group">
                <label>Описание</label>
                <textarea v-model="folderDescription"> </textarea>
            </div>
            <div class="group">
                <SwitchButton :inputLabel='"Является ли комиксом"' :inputName="'comics'" v-model="folderIsComic"
                    @click="saveStatus('comm')">
                </SwitchButton>
            </div>
            <div class="form-group"></div>
            <div class="form-group">
                <button class="btn btn--update" @click="saveFolder">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import Image from '../atoms/Image.vue';
import { notifications } from '@main/state';
import SwitchButton from '../molecules/SwitchButton.vue';

export default {
    components: {
        Multiselect,
        Image,
        SwitchButton
    },
    data() {
        return {
            folderName: null,
            folderImage: null,
            folderDescription: null,
            folderIsComic: false,
            folderPicture: null,
            folderPicturePreview: null
        }
    },
    methods: {
        saveStatus() {
            this.folderIsComic = !this.folderIsComic;
        },
        newFolderImage(e) {
            let file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                notifications.generateNotification('bad', 'Ошибка загрузки изображения');
                return;
            }
            this.folderPicture = file[0];
            this.folderPicturePreview = URL.createObjectURL(new File(file, file.name));

        },
        async saveFolder() {
            if (this.folderName == '' || this.folderName == null) {
                notifications.generateNotification('bad', 'Заполните поле название');
                return false;
            }
            const folderForm = new FormData();
            folderForm.append('code', this.$route.params.name);
            folderForm.append('name', this.folderName);
            folderForm.append('description', this.folderDescription);
            folderForm.append('iscomics', this.folderIsComic);
            if (this.folderPicture) {
                folderForm.append('image', this.folderPicture);
            }
            let request;
            if (this.folderIsComic) {
                request = await axios.post('//furry-world.ru/console/comics/post_create_folder.php', folderForm,
                    {
                        headers:
                        {
                            "Authorization": "Bearer " + localStorage.getItem('token'),
                        }
                    }
                )
            } else {
                request = await axios.post('//furry-world.ru/console/post_create_folder.php', folderForm,
                    {
                        headers:
                        {
                            "Authorization": "Bearer " + localStorage.getItem('token'),
                        }
                    }
                )
            }
            if (request.data.status == 'success') {
                notifications.generateNotification('good', request.data.text);
                setTimeot(function () {
                    window.location = '/personal/';
                }, 1000);
            } else {
                notifications.generateNotification('bad', request.data.text);
            }


        }
    }
}
</script>

<style scoped>
h2 {
    text-align: left;
    color: #fff;
    margin-bottom: 20px;
}

.profile-container {
    max-width: 100%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

label {
    color: white;
    font-weight: 700;
    font-size: 24px;
}

.left-block {
    flex: 1;
}

.left-block img {
    max-width: 480px;

}

.right-block {
    flex: 3;
}

select {
    width: 100%;
    padding: 20px;
}
</style>
<style>
.toggle-checkbox {
    width: 350px !important;
}
</style>
