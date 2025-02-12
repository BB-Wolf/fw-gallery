<template>
    <section id="all-images-list" v-if="this.$route.params.name == 'all'">
        <div class="profile-container">
            <h2>Все изображения</h2>
            <div class="muted mt-20" style="color:rgba(255,255,255,0.5)">Нажмите на изображение для редактирования</div>

            <div class="image-grid">
                <div class="image-item" v-for="galleryImage in imagesList" v-bind:key="galleryImage.id">
                    <Image @click="editPicture(galleryImage.id)" imageClass="slide" :imageSrc=galleryImage.picture
                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                    </Image>
                </div>
            </div>
        </div>
    </section>

    <section id="all-images-list" v-if="this.$route.params.name != 'all'">
        <div class="profile-container">
            <h2>Альбом {{ this.$route.params.name }}</h2>
            <div class="edit-block">
                <div class="btn btn--primary mb-10" @click="addImageToFolder">Загрузить работу в папку</div>
                <div class="btn btn--info mb-10" @click="editFolder">Редактировать папку</div>
            </div>
            <section id="edit-folder" v-if="this.mode == 'folder'">
                <div class="profile-container d-flex g-20 flex-wrap">
                    <div class="left-block">
                        <div class="h2">{{ this.folderName }}</div>
                        <img :src="this.folderImage">
                        <div class="form-group">
                            <label>Загрузить новое изображение</label>
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
                        <div class="form-groupp">
                            <button class="btn btn--update" @click="saveFolder">Сохранить изменения</button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="addinto-folder" v-if="this.mode == 'newImage'">
                <div class="profile-container d-flex g-20 flex-wrap">
                    <div class="left-block">
                        <div @click="$refs.characterImage.click()">
                            <div class="h2" style="cursor:pointer; font-size:18px;">Нажмите чтобы загрузить изображение
                            </div>
                            <img :src="this.newImageRaw" alt="Нажмите чтобы загрузить фото" class="character-image">
                            <input type="file" ref="characterImage" style="display: none" @change="newImageUpload">
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="group">
                            <label>Название</label>
                            <input type='text' v-model="this.currentImage.title">
                        </div>
                        <div class="group">
                            <label>Описание</label>
                            <textarea v-model="this.currentImage.description"> </textarea>
                        </div>
                        <div class="group">
                            <label>Номер страницы</label>
                            <input type='text' v-model="this.fsort">
                        </div>
                        <div class="group">
                            <label>Теги</label>
                            <input type="text" v-model="tags" class="taglist">
                        </div>
                        <div class="group">
                            <label>Раздел</label>
                            <div style="color:white">{{ this.$route.params.name }}</div>
                        </div>
                        <div class="group mt-20">
                            <div class="btn btn--success" @click="createImage">Сохранить</div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="form-group">
                <div class="h2">Работы в разделе</div>
                <div class="muted mt-20" style="color:rgba(255,255,255,0.5)">Нажмите на изображение для редактирования
                </div>
            </div>
            <div class="image-grid">
                <div :style="'order:' + galleryImage.fsort + ';'" class="image-item" v-for="galleryImage in imagesList"
                    v-bind:key="galleryImage.id">
                    <Image style="order:{{ this.galleryImage.fsort }}" @click="editPicture(galleryImage.id)"
                        imageClass="slide" :imageSrc=galleryImage.picture
                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                    </Image>
                    <div class="form-group">
                        <label>Номер страницы</label>
                        <input type="text" :data-image-id=galleryImage.id @change="changeOrder($event)"
                            v-model=galleryImage.fsort>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="single-image-edit" v-if="this.currentImage && this.mode != 'newImage'">
        <div class="profile-container d-flex g-20 flex-wrap">
            <div class="left-block">
                <div class="h2">{{ this.currentImage.title }}</div>
                <img :src="this.currentImage.picture">
                <button class="btn btn--update">Изменить изображение</button>
            </div>
            <div class="right-block">
                <div class="group">
                    <label>Название</label>
                    <input type='text' v-model="this.currentImage.title">
                </div>
                <div class="group">
                    <label>Описание</label>
                    <textarea v-model="this.currentImage.description"> </textarea>
                </div>
                <div class="group">
                    <label>Теги</label>
                    <input type="text" v-model="tags" class="taglist">
                </div>
                <div class="group">
                    <label>Раздел</label>
                    <select v-model="folder">
                        <template v-for="userfolder in this.folders" :key="userfolder.id">
                            <option :value="userfolder.id" v-if="this.currentImage.folder == userfolder.id"
                                :selected="true">{{ userfolder.name }}</option>
                            <option :value="userfolder.id" v-else>{{ userfolder.name }}</option>
                        </template>
                    </select>
                </div>
                <div class="group mt-20">
                    <div class="btn btn--success" @click="saveImage">Сохранить</div>
                </div>
                <div class="group mt-20">
                    <div class="btn btn--danger" @click="validateDelete">Удалить</div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import Image from '../atoms/Image.vue';
import { notifications } from '@/state';

export default {
    components: {
        Multiselect,
        Image
    },
    data() {
        return {
            imagesList: [],
            currentImage: null,
            tags: null,
            folder: this.$route.params.name,
            folders: [],
            title: null,
            description: '',
            mode: null,
            folderName: null,
            folderImage: null,
            folderDescription: '',
            folderIsComic: null,
            newImage: null,
            newImageRaw: null,
            fsort: null,
        }
    },
    methods: {
        changeOrder(event) {
            setTimeout(async function () {
                let eventVal = event.target.value;
                let sendChangeOrder = await new axios.get('//furry-world.ru/console/get_change_comic_page_order.php?image=' + event.target.dataset.imageId + '&sort=' + eventVal, {
                    headers:
                    {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                })
            }, 500);

        },
        addImageToFolder() {
            this.mode = 'newImage';
            this.folder = this.$route.params.name;
            this.currentImage = {
                'title': '',
                'picture': '',
                'description': ''
            };
        },
        newImageUpload(e) {
            let file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                notifications.generateNotification('bad', 'Ошибка загрузки изображения');

                return;
            }
            this.newImage = file[0];
            this.newImageRaw = URL.createObjectURL(new File(file, file.name));

        },
        newFolderImage(e) {
            let file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                notifications.generateNotification('bad', 'Ошибка загрузки изображения');

                return;
            }
            this.folderPictureNew = file[0];
        },
        async editFolder() {
            this.mode = 'folder';
            const getFolderInfo = await new axios.get('//furry-world.ru/console/get_folder_info.php?folder=' + this.$route.params.name,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
            if (getFolderInfo.data) {
                if (getFolderInfo.data) {
                    this.folderName = getFolderInfo.data.name;
                    this.folderDescription = getFolderInfo.data.description;
                    this.folderIsComic = getFolderInfo.data.isComic;
                    this.folderImage = getFolderInfo.data.picture;
                } else {
                    notifications.generateNotification('bad', 'Ошибка получения информации о папке');
                }
            }
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
            if (this.folderPictureNew) {
                folderForm.append('image', this.folderPictureNew);
            }
            let request = await axios.post('//furry-world.ru/console/post_update_folder.php', folderForm,
                {
                    headers:
                    {
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                    }
                }
            )
            if (request.data.status == 'success') {
                notifications.generateNotification('good', request.data.text);
            } else {
                notifications.generateNotification('bad', 'Ошибка обновления данных');
            }


        },
        async createImage() {
            const formImage = new FormData();
            formImage.append('id', this.currentImage.id);
            formImage.append('title', this.currentImage.title);
            formImage.append('description', this.currentImage.description);
            formImage.append('tags', this.tags);
            formImage.append('folder', this.folder);
            formImage.append('file', this.newImage);
            formImage.append('fsort', this.fsort);
            const request = await axios.post('//furry-world.ru/console/post_image_create.php', formImage, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data.status == 'success') {
                notifications.generateNotification('good', request.data.text);
            } else {
                notifications.generateNotification('bad', request.data.text);
            }

        },
        async saveImage() {
            const formImage = new FormData();
            formImage.append('id', this.currentImage.id);
            formImage.append('title', this.currentImage.title);
            formImage.append('description', this.currentImage.description);
            formImage.append('tags', this.tags);
            formImage.append('folder', this.folder);
            const request = await axios.post('//furry-world.ru/console/put_image_update.php', formImage, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data.status == 'success') {
                notifications.generateNotification('good', request.data.text);
            } else {
                notifications.generateNotification('bad', request.data.text);
            }

        },
        editPicture(img) {
            for (let i = 0; i < this.imagesList.length; i++) {
                if (this.imagesList[i].id == img) {
                    this.currentImage = this.imagesList[i];
                }
            }
            setTimeout(() => {
                const element = document.getElementById("single-image-edit");
                element.scrollIntoView({ behavior: "smooth" });
            }, 500);

        },
        validateDelete() {
            let result = prompt("Are you sure you want to delete? Type 'delete' to remove image");
            if (result === 'delete') {
                const sendDeleteRequest = axios.get('//furry-world.ru/console/get_delete_image.php',
                    {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        }

                    }
                );
                if (sendDeleteRequest.data && sendDeleteRequest.data.status == 'success') {
                    let url;
                    if (this.$route.params.name == 'all') {
                        url = '//furry-world.ru/console/get_gallery_picture.php?user=' + localStorage.getItem('token');
                    } else {
                        url = '//furry-world.ru/console/get_gallery_picture.php?user=y';
                    }
                    const getImagesList = new axios.get(url, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        }
                    });
                    if (getImagesList.data) {
                        this.imagesList = getImagesList.data;
                    }
                } else {
                    let errorText = '';
                    if (sendDeleteRequest.data) { errorText = sendDeleteRequest.data.text; } else {
                        errorText = 'Произошла ошибка удаления файла. Попробуйте еще раз';
                    }
                    notifications.generateNotification('bad', errorText);
                }
            }

        }
    },
    async created() {
        let url;
        if (this.$route.params.name == 'all') {
            url = '//furry-world.ru/console/get_gallery_picture.php?user=' + localStorage.getItem('token');
        } else {
            url = '//furry-world.ru/console/get_gallery_picture.php?user=' + localStorage.getItem('token') + '&folder=' + this.$route.params.name;
        }
        const getImagesList = await new axios.get(url, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if (getImagesList.data) {
            this.imagesList = getImagesList.data;
        }
        const getFoldersList = await new axios.get('//furry-world.ru/console/get_user_folders.php',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        );

        if (getFoldersList.data) {
            this.folders = getFoldersList.data;
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

.image-item {
    flex-direction: column;
    background-color: unset;
}
</style>