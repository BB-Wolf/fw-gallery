<script>
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import InputText from '../atoms/InputText.vue';
import axios from 'axios';
import SwitchButton from '../molecules/SwitchButton.vue';
import Image from '../atoms/Image.vue';

export default {
    components:
    {
        TabsContent,
        TabsRoot,
        TabsList,
        TabsTrigger,
        InputText,
        SwitchButton,
        Image,

    },
    props: {

    },
    data() {
        return {
            userFavs: null,
            rawFile: null,
            userLogin: null,
            userTitle: null,
            userFolders: null,
            userAvatar: null,
            userFields: null,
            userStatus: null,
        };
    },
    async created() {
        const getUserProfile = await new axios.get('//img-fw.bb-wolf.site/console/get_user_profile.php',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        );
        if (getUserProfile.data) {
            this.userLogin = getUserProfile.data.user;
            this.userAvatar = getUserProfile.data.avatar;
            this.userFields = JSON.parse(getUserProfile.data.userFields);
            this.userStatus = JSON.parse(getUserProfile.data.status);
        }

    },
    methods: {
        async getFavs() {
            const getFavs = await new axios.get('//img-fw.bb-wolf.site/console/get_user_favs.php?user=' + this.userLogin,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
            if (getFavs.data) {
                this.userFavs = getFavs.data;
            }
        },
        saveProfile() { },
        addField() {
            let buttonAdd = document.querySelector(".add-fields");
            let field = '<div class="newfield-container"><label class="newfield-label">Новое поле:</label><input type="text" placeholder="Введите название поля" class="new-label" ><textarea class=""></textarea></div>';
            buttonAdd.insertAdjacentHTML('beforebegin', field);

        },
        onAvatarUpload(e) {
            var file = e.target.files || e.dataTransfer.files;
            if (!file.length) {
                return;
            }
            this.rawFile = file[0];
        },
        async saveAvatar() {
            var avatarData = new FormData();
            avatarData.append('file', this.rawFile);
            const request = await axios.post('//img-fw.bb-wolf.site/console/post_update_profile.php?mode=avatar', avatarData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data) {
                this.responseData = request.data;
            }


        },
        removeField(e) {
            e.event.target.remove;
        },
        async saveFields() {
            var fieldsData = new FormData();
            var newFields = [];
            var infoFields = [];
            if (document.querySelectorAll(".newfield-container").length > 0) {
                var fieldContainer = document.querySelectorAll('.newfield-container');
                for (let i = 0; i < fieldContainer.length; i++) {
                    newFields[i] = {
                        type: "text",
                        label: fieldContainer[i].querySelector('.new-label').value,
                        value: fieldContainer[i].querySelector('textarea').value
                    };
                }

            }
            var infoFieildsContainer = document.querySelector('.infoFields');
            if (infoFieildsContainer) {
                var labels = infoFieildsContainer.querySelectorAll('label');
                var vals = infoFieildsContainer.querySelectorAll('.infoFieldVal');

                for (let i = 0; i < labels.length; i++) {
                    infoFields[i] = {
                        type: "text",
                        label: labels[i].innerHTML,
                        value: vals[i].value
                    };
                }
            }
            console.log(infoFields);
            let mergedArray = [...newFields, ...infoFields];
            fieldsData.append('fields', JSON.stringify(mergedArray));
            fieldsData.append('username', document.querySelector('#username').value);
            const request = await axios.post('//img-fw.bb-wolf.site/console/post_update_profile.php?mode=fields', fieldsData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data) {
                this.responseData = request.data;
                location.reload();
            }

        },
        saveStatus(status) {


        },
        saveTags() { }
    }
}
</script>
<template>
    <div class="profile-container" style="overflow: hidden;" v-if="this.userLogin">
        <TabsRoot default-value="tab1" orientation="horizontal">
            <div class="author-tabs">
                <TabsList aria-label="tabs example">
                    <TabsTrigger value="tab1" class="tab-button">
                        Профиль
                    </TabsTrigger>
                    <TabsTrigger value="tab2" class="tab-button">
                        Галерея
                    </TabsTrigger>
                    <TabsTrigger value="tab3" class="tab-button" @click="getFavs">
                        Избранное
                    </TabsTrigger>
                    <TabsTrigger value="tab4" class="tab-button">
                        Статистика
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="tab1">
                <div class="profile-container">
                    <h2>Профиль</h2>
                    <!-- Profile Section -->
                    <div class="profile-section">
                        <!-- Avatar -->
                        <div class="profile-avatar">
                            <img :src="this.userAvatar" alt="Avatar" class="profile-avatar">
                        </div>
                        <div class="user-data">

                            <!-- Avatar Upload -->
                            <label for="avatarUpload">Сменить аватар</label>
                            <label for="avatarUpload" class="file-upload-label">Выберите файл</label>
                            <input type="file" id="avatarUpload" accept="image/*" @change="onAvatarUpload">
                            <button class="update-btn" @click="saveAvatar">Сохранить</button>
                        </div>
                    </div>
                </div>
                <div class="profile-container">
                    <div class="h1">Инфо</div>
                    <div class="hint">Эти поля будут отображены в профиле</div>
                    <div class="profile-section">
                        <!-- User Data -->
                        <div class="user-data">

                            <!-- Username -->
                            <label for="username">Никнейм</label>

                            <input type="text" id="username" value="{{this.userLogin}}" class="infoFieldVal-username"
                                v-model="this.userLogin" required>
                            <div class="infoFields" v-if="userFields.length > 0">
                                <InputText v-for="userField in userFields" :key="userField"
                                    :inputLabel="userField.label" :inputValue="userField.value"
                                    :inputClass="'infoFieldVal'"> </InputText>
                            </div>
                            <div class="add-fields" @click="addField">Добавить поле</div>
                        </div>
                    </div>
                    <!-- Update Button -->
                    <button class="update-btn" @click="saveFields">Сохранить</button>

                </div>
                <div class="profile-container" style="">
                    <div class="h1">Статус</div>
                    <div class="profile-section" style="flex-wrap: wrap;">
                        <!-- User Data -->
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Беру заказы"' :inputName="'comms'" @click="saveStatus('comm')">
                            </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Беру трейды"' :inputName="'trades'" @click="saveStatus('comm')">
                            </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Беру реквесты"' :inputName="'requests'"
                                @click="saveStatus('comm')"> </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Рисую NSFW"' :inputName="'nsfw'" @click="saveStatus('comm')">
                            </SwitchButton>
                        </div>
                    </div>
                </div>

                <div class="profile-container">
                    <div class="h1">Управление тегами</div>
                    <div class="profile-section">
                        <!-- User Data -->
                        <div class="user-data">
                            <div class="add-fields" @click="saveTags">Сохранить</div>
                        </div>
                    </div>
                    <!-- Update Button -->
                    <button class="update-btn" @click="saveFields">Сохранить</button>

                </div>

                <div class="profile-container" style="">
                    <div class="h1">Связанные галереи для автопостинга (coming soon)</div>
                    <div class="profile-section" style="flex-wrap: wrap;">
                        <div class="user-data">
                            <label>Telegam</label>
                            <label>DeviantArt</label>
                            <label>VK</label>
                        </div>
                    </div>
                    <!-- Update Button -->
                    <button class="update-btn">Сохранить</button>

                </div>

            </TabsContent>
            <TabsContent value="tab2">
                <div class="profile-container">
                    <h2>Галерея</h2>

                    <!-- Folders Section -->
                    <div class="folders-section">
                        <h3>Альбомы</h3>
                        <ul class="folders-list">
                            <li>
                                <span>Все работы</span>
                                <button class="file-upload-label">Edit</button>
                            </li>
                            <li>
                                <span>Travel</span>
                                <button class="file-upload-label">Edit</button>
                            </li>
                            <li>
                                <span>Art</span>
                                <button class="file-upload-label">Edit</button>
                            </li>
                        </ul>
                    </div>

                    <!-- Update Button -->
                    <button class="update-btn" @click="saveProfile">Сохранить изменения</button>

                </div>
            </TabsContent>
            <TabsContent value="tab3">
                <div class="profile-container" style="height:auto;">
                    <div class="image-grid" v-infinite-scroll="onLoadMore">
                        <div class="image-item" v-for="galleryImage in userFavs" v-bind:key="galleryImage">
                            <a :href="galleryImage.link">
                                <Image imageClass="" :imageSrc=galleryImage.picture
                                    :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                                </Image>
                            </a>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="tab4">
                <div class="h1">Скоро</div>
            </TabsContent>
        </TabsRoot>
    </div>
</template>
<style scoped>
textarea {
    width: 100%;
}

.add-fields {
    color: #fff;
    background-color: #2b919a;
    padding: 10px;
    text-align: center;
}

/* Container */
.profile-container {
    max-width: 100%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

h2 {
    text-align: left;
    color: #ffcc00;
    margin-bottom: 20px;
}

/* Profile section */
.profile-section {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.profile-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #444;
    margin-right: 20px;
    object-fit: cover;
}

/* User data */
.user-data {
    flex-grow: 1;
}

.user-data label {
    display: block;
    font-weight: bold;
    color: #ddd;
    margin-bottom: 10px;
}

input[type="text"],
.user-data input[type="text"],
.user-data input[type="email"],
.user-data input[type="file"] {
    background-color: #1f1f1f;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 15px;
    font-size: 16px;
    outline: none;
}

.user-data input[type="text"]:focus,
.user-data input[type="email"]:focus,
.user-data input[type="file"]:focus {
    border-color: #ffcc00;
}

/* Folders section */
.folders-section {
    margin-bottom: 20px;
}

.folders-section h3 {
    color: #ffcc00;
    margin-bottom: 10px;
}

.folders-list {
    list-style-type: none;
    padding: 0;
}

.folders-list li {
    background-color: #1f1f1f;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.folders-list li span {
    color: #fff;
}

/* Update Button */
.update-btn {
    background-color: #ffcc00;
    color: #2b2b2b;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    width: 100%;
    transition: background-color 0.3s ease;
}

.update-btn:hover {
    background-color: #e6b800;
}

/* Section title */
.section-title {
    font-size: 18px;
    color: #ffcc00;
    margin-bottom: 10px;
}

.file-upload-label {
    cursor: pointer;
    display: inline-block;
    padding: 10px 20px;
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
}

.file-upload-label:hover {
    background-color: #ffcc00;
    color: #2b2b2b;
}

/* Hide file input */
input[type="file"] {
    display: none;
}

.author-tabs {
    display: flex;
    margin-top: 20px;
    width: 70%;
}


.tab-button {
    padding: 20px;
}

.tab-button[data-state="inactive"] {
    opacity: 0.5;
}

.image-item {
    flex: 0 350px;
}

.hint {
    color: #fff;
    margin-bottom: 20px;
}
</style>