<template>
    <AutosaveModal v-if="showAutosaveModal" :saveText="'Сохраняем...'"></AutosaveModal>

    <section id="all-images-list" v-if="$route.params.name == 'all'">
        <div class="profile-container">
            <h2>Все изображения</h2>
            <div class="muted mt-20" style="color:rgba(255,255,255,0.5)">Нажмите на изображение для редактирования</div>

            <div class="image-grid">
                <div class="image-item" v-for="galleryImage in imagesList" :key="galleryImage.id">
                    <Image @click="editPicture(galleryImage.id)" imageClass="slide" :imageSrc="galleryImage.picture"
                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                    </Image>
                </div>
            </div>
        </div>
    </section>

    <section id="all-images-list" v-if="$route.params.name != 'all'">
        <div class="profile-container">
            <h2>Альбом {{ $route.params.name }}</h2>
            <div class="edit-block">
                <div class="btn btn--primary mb-10" @click="addImageToFolder">Загрузить работу в папку</div>
                <div class="btn btn--info mb-10" @click="editFolder">Редактировать папку</div>
            </div>
            <section id="edit-folder" v-if="mode == 'folder'">
                <div class="profile-container d-flex g-20 flex-wrap">
                    <div class="left-block">
                        <div class="h2">{{ folderName }}</div>
                        <img :src="folderImage">
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
                        <div class="form-group">
                            <button class="btn btn--update" @click="saveFolder">Сохранить изменения</button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="addinto-folder" v-if="mode == 'newImage'">
                <div class="profile-container d-flex g-20 flex-wrap">
                    <div class="left-block">
                        <div @click="$refs.characterImage.click()">
                            <div class="h2" style="cursor:pointer; font-size:18px;">Нажмите чтобы загрузить изображение
                            </div>
                            <img :src="newImageRaw" alt="Нажмите чтобы загрузить фото" class="character-image">
                            <input type="file" ref="characterImage" style="display: none" @change="newImageUpload">
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="group">
                            <label>Название</label>
                            <input type='text' v-model="currentImage.title">
                        </div>
                        <div class="group">
                            <label>Описание</label>
                            <textarea v-model="currentImage.description"> </textarea>
                        </div>
                        <div class="group">
                            <label>Номер страницы</label>
                            <input type='text' v-model="fsort">
                        </div>
                        <div class="group">
                            <label>Теги</label>
                            <input type="text" v-model="tags" class="taglist">
                        </div>
                        <div class="group">
                            <label>Раздел</label>
                            <div style="color:white">{{ $route.params.name }}</div>
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
                <div v-for="galleryImage in imagesList" :key="galleryImage.id" :style="{ order: galleryImage.fsort }"
                    class="image-item">
                    <Image @click="editPicture(galleryImage.id)" imageClass="slide" :imageSrc="galleryImage.picture"
                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                    </Image>
                    <div class="form-group">
                        <label>Номер страницы</label>
                        <input type="text" :data-image-id="galleryImage.id" @change="changeOrder($event)"
                            v-model="galleryImage.fsort">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="single-image-edit" v-if="currentImage && mode != 'newImage'">
        <div class="profile-container d-flex g-20 flex-wrap">
            <div class="left-block">
                <div class="h2">{{ currentImage.title }}</div>
                <img :src="currentImage.picture">
                <button class="btn btn--update">Изменить изображение</button>
            </div>
            <div class="right-block">
                <div class="group">
                    <label>Название</label>
                    <input type='text' v-model="currentImage.title">
                </div>
                <div class="group">
                    <label>Описание</label>
                    <textarea v-model="currentImage.description"> </textarea>
                </div>
                <div class="group">
                    <label>Теги</label>
                    <input type="text" v-model="tags" class="taglist">
                </div>
                <div class="group">
                    <label>Раздел</label>
                    <select v-model="folder">
                        <template v-for="userfolder in folders" :key="userfolder.id">
                            <option :value="userfolder.id" v-if="currentImage.folder == userfolder.id" :selected="true">
                                {{ userfolder.name }}</option>
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
import { notifications, userFolders } from '@main/state';
import AutosaveModal from '@gallery/components/molecules/AutosaveModal.vue';


export default {
    components: {
        Multiselect,
        Image,
        AutosaveModal
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
            showAutosaveModal: false
        }
    },
    methods: {
        async changeOrder(event) {
            let eventVal = event.target.value;
            let imageId = event.target.dataset.imageId;
            let sendChangeOrder = await axios.get('//furry-world.ru/console/comics/get_change_comic_page_order.php?image=' + imageId + '&sort=' + eventVal, {
                headers:
                {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
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
            this.newImageRaw = URL.createObjectURL(this.newImage);

        },
        newFolderImage(e) {
            let file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                notifications.generateNotification('bad', 'Ошибка загрузки изображения');

                return;
            }
            this.folderPictureNew = file[0];
            this.folderImage = URL.createObjectURL(this.folderPictureNew);
        },
        async editFolder() {
            this.mode = 'folder';
        },
        async saveFolder() {
            this.showAutosaveModal = true;
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
            let request = await axios.post('//furry-world.ru/console/comics/post_edit_folder.php', folderForm,
                {
                    headers:
                    {
                        "Authorization": "Bearer " + localStorage.getItem('token'),
                    }
                }
            )
            if (request.data.status == 'success') {
                notifications.generateNotification('Успех', request.data.text);
            } else {
                notifications.generateNotification('Ошибка', 'Ошибка обновления данных');
            }
            this.showAutosaveModal = false;

        },
        async createImage() {
            this.showAutosaveModal = true;
            let getFolderType = await axios.get('//furry-world.ru/console/get_folder_type.php?folder=' + this.folder,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }
            );

            const formImage = new FormData();
            let request;
            formImage.append('id', this.currentImage.id);
            formImage.append('title', this.currentImage.title);
            formImage.append('description', this.currentImage.description);
            formImage.append('tags', this.tags);
            formImage.append('folder', this.folder);
            formImage.append('file', this.newImage);
            formImage.append('fsort', this.fsort);

            request = await axios.post('//furry-world.ru/console/comics/post_add_image.php', formImage, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });

            if (request.data.status == 'success') {
                notifications.generateNotification('Успех', request.data.text);
                this.mode = 'all';
            } else {
                notifications.generateNotification('Ошибка', request.data.text);
            }
            this.showAutosaveModal = false;
        },
        async saveImage() {
            this.showAutosaveModal = true;
            const formImage = new FormData();
            formImage.append('id', this.currentImage.id);
            formImage.append('title', this.currentImage.title);
            formImage.append('description', this.currentImage.description);
            formImage.append('tags', this.tags);
            formImage.append('folder', this.folder);
            const request = await axios.post('//furry-world.ru/console/comics/put_image_update.php', formImage, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data.status == 'success') {
                notifications.generateNotification('Успех', request.data.text);
            } else {
                notifications.generateNotification('Ошибка', request.data.text);
            }
            this.showAutosaveModal = false;
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
        async validateDelete() {
            let result = prompt("Вы точно хотите удалить изображение? Напишите 'delete' для удаления (без кавычек)");
            if (result === 'delete') {
                try {
                    const sendDeleteRequest = await axios.get('//furry-world.ru/console/comics/get_delete_image.php?image=' + this.currentImage.id,
                        {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token"),
                            }
                        }
                    );
                    if (sendDeleteRequest.data && sendDeleteRequest.data.status == 'success') {
                        let url;
                        if (this.$route.params.name == 'all') {
                            url = '//furry-world.ru/console/comics/get_images.php?user=' + localStorage.getItem('token');
                        } else {
                            url = '//furry-world.ru/console/comics/get_images.php?folder=' + this.$route.params.name;
                        }
                        const getImagesList = await axios.get(url, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token"),
                            }
                        });
                        if (getImagesList.data) {
                            this.imagesList = getImagesList.data;
                        }
                        this.mode = 'all';
                    } else {
                        let errorText = sendDeleteRequest.data ? sendDeleteRequest.data.text : 'Произошла ошибка удаления файла. Попробуйте еще раз';
                        notifications.generateNotification('Ошибка', errorText);
                    }
                } catch (e) {
                    notifications.generateNotification('Ошибка', 'Сетевая ошибка при удалении');
                }
            }
        }
    },
    async created() {
        let url = '//furry-world.ru/console/comics/get_images.php?user=' + localStorage.getItem('token');
        const getImagesList = await axios.get(url, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if (getImagesList.data) {
            this.imagesList = getImagesList.data;
        }
        let getFoldersList = userFolders.fetchFolders();

        if (getFoldersList.data) {
            this.folders = getFoldersList.folders;
        }

        const getFolderInfo = await axios.get('//furry-world.ru/console/comics/get_folder_info.php?code=' + this.$route.params.name,
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
    }
}
</script>
