<script>
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import InputText from '../atoms/InputText.vue';
import axios from 'axios';
import SwitchButton from '../molecules/SwitchButton.vue';
import Image from '../atoms/Image.vue';
import { notifications, mobileDevice } from '@main/state';
import PersonalStats from '@gallery/components/organisms/PersonalStats.vue';
import AutosaveModal from '@gallery/components/molecules/AutosaveModal.vue';
import ModalRate from '../molecules/ModalRate.vue';
import TelegramLink from '../organisms/Profile/TelegramLink.vue';
import TelegramPostsType from '../organisms/Profile/TelegramPostsType.vue';
import TelegramModeration from '../organisms/Profile/TelegramModeration.vue';
import ManageAdopts from '../organisms/Personal/Adopts/ManageAdopts.vue';

export default {
    components:
    {
        TabsRoot,
        TabsContent,
        TabsList,
        TabsTrigger,
        InputText,
        SwitchButton,
        Image,
        PersonalStats,
        AutosaveModal,
        ModalRate,
        TelegramLink,
        TelegramPostsType,
        TelegramPostsType,
        TelegramModeration,
        ManageAdopts
    },
    data() {
        return {
            userFavs: null,
            rawFile: null,
            file: null,
            userLogin: null,
            userTitle: null,
            userFolders: null,
            userAvatar: null,
            userFields: null,
            userStatus: null,
            userDevice: mobileDevice,
            userChars: null,
            userComms: false,
            userTrades: false,
            userRequests: false,
            userDrawNsfw: false,
            userNewPassword: '',
            userConfirmPassword: '',
            mobileBtnClass: 'btn btn--default',
            charName: '',
            charAge: '',
            charBio: '',
            charSpecie: '',
            charFullStory: '',
            charAvatar: null,
            charAvatarRaw: null,
            characterHeaderRaw: null,
            characterHeader: null,
            isMentionable: 0,
            isTradable: 0,
            rawHeader: null,
            userHeader: null,
            showActionModal: false,
            charRate: 1,
            extTgId: '',
            adoptFixedPrice: '',
            adoptMinPrice: '',
            adoptAbPrice: '',
        };
    },
    async created() {
        const getUserProfile = await new axios.get('//furry-world.ru/console/get_user_profile.php',
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
            this.userStatus = JSON.parse(getUserProfile.data.status)
            this.extTgId = getUserProfile.data.extTgID
            this.extTgModeration = getUserProfile.data.extTgSettings.posting
            this.extTgTypes = getUserProfile.data.extTgSettings.type

            console.log(this.extTgId);

            if (this.userStatus.types.length > 0) {
                for (let i = 0; i < this.userStatus.types.length; i++) {
                    console.log(this.userStatus.types[i]);
                    if (this.userStatus.types[i] == 'comm') {
                        this.userComms = true;
                    } else if (this.userStatus.types[i] == 'trades') {
                        this.userTrades = true;
                    } else if (this.userStatus.types[i] == 'requests') {
                        this.userRequests = true;
                    } else if (this.userStatus.types[i] == 'nsfw') {
                        this.userDrawNsfw = true;
                    }


                }
            }
        }
        const getUserFolders = await new axios.get('//furry-world.ru/console/personal/get_user_folders.php', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });

        if (getUserFolders.data) {
            this.userFolders = getUserFolders.data;
        }

    },
    methods: {
        async updatePassword() {
            if (this.userNewPassword === this.userConfirmPassword) {
                const formData = new FormData();
                formData.append('password', this.userNewPassword);
                formData.append('confirm', this.userConfirmPassword);
                let sendPasswordRequest = await new axios.post('//furry-world.ru/console/post_update_password.php', formData, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }

                });
                if (sendPasswordRequest.data && sendPasswordRequest.data.status == 'success') {
                    notifications.generateNotification('Успех', sendPasswordRequest.data.text);

                } else {
                    notifications.generateNotification('Ошибка', sendPasswordRequest.data.text);

                }

            } else {
                notifications.generateNotification('Ошибка', 'Пароли не совпадают');
            }
        },
        async fetchTags(tag) {
            const lookUpTag = await axios.get('//furry-world.ru/console/get_search_tags.php?q=' + tag);

            if (lookUpTag.data) {
                document.querySelector('.filter-go').classList.add('filter-go--active');
                return lookUpTag.data;
            } else {
                //  return { label: 'По запросу ничего не найдено' };
            }
        },
        async saveCharacter() {
            let formData = new FormData();
            formData.append('name', this.charName);
            formData.append('age', this.charAge);
            formData.append('species', this.charSpecie);
            formData.append('short', this.charBio);
            formData.append('full', this.charFullStory);
            formData.append('file', this.charAvatar);
            formData.append('ismentionable', this.isMentionable ? 'on' : '');
            formData.append('istradeable', this.isTradable ? 'on' : '');
            formData.append('charheader', this.characterHeader);
            formData.append('rate', this.charRate);
            formData.append('adoptFixedPrice', this.adoptFixedPrice);
            formData.append('adoptMinPrice', this.adoptMinPrice);
            formData.append('adoptAbPrice', this.adoptAbPrice);
            this.showActionModal = true;

            let url = '//furry-world.ru/console/post_create_character.php';
            if (this.isTradable) {
                url = '//furry-world.ru/console/adopts/post_create_adopt.php';
            }

            let saveFormData = await new axios.post(url, formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });

            if (saveFormData.data) {
                notifications.generateNotification(saveFormData.data.status, saveFormData.data.text);
                this.showActionModal = false;
            } else {
                notifications.generateNotification('bad', 'Ошибка сохранения персонажа')
                this.showActionModal = false;
            }
        },
        async getChars() {
            let getUserChars = await new axios.get('//furry-world.ru/console/get_user_characters.php',
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token')
                    }
                }
            );
            if (getUserChars.data) {
                this.userChars = getUserChars.data;
            } else {
                notifications.generateNotification('bad', 'Ошибка загрузки списка персонажей')
            }
        },
        async getFavs() {
            const getFavs = await new axios.get('//furry-world.ru/console/get_user_favs.php?user=' + this.userLogin,
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
        newCharacterAvatar(e) {
            let avatarFile = e.target.files || e.dataTransfer.files;
            this.charAvatar = avatarFile[0];
            this.charAvatarRaw = URL.createObjectURL(new File(avatarFile, avatarFile.name))

        },
        newCharacterHeader(e) {
            let avatarFile = e.target.files || e.dataTransfer.files;
            this.characterHeader = avatarFile[0];
            this.characterHeaderRaw = URL.createObjectURL(new File(avatarFile, avatarFile.name))

        },
        onAvatarUpload(e) {
            this.file = e.target.files || e.dataTransfer.files;
            var file = this.file;
            if (!file.length) {
                return;
            }
            this.rawFile = file[0];
        },

        async saveAvatar() {
            this.showActionModal = true;
            var avatarData = new FormData();
            avatarData.append('file', this.rawFile);
            const request = await axios.post('//furry-world.ru/console/post_update_profile.php?mode=avatar', avatarData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data) {
                this.responseData = request.data;
                if (this.responseData.status == 'success') {
                    let img = document.querySelector('img.profile-avatar');
                    if (img) {
                        img.src = URL.createObjectURL(new File(this.file, this.file.name));
                        notifications.generateNotification('Успех', 'Аватар успешно сохранен');
                    }
                }
            }
            this.showActionModal = false;
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
                    if (vals[i].value != '') {
                        infoFields[i] = {
                            type: "text",
                            label: labels[i].innerHTML,
                            value: vals[i].value
                        };
                    }
                }
            }

            let mergedArray = [...newFields, ...infoFields];
            fieldsData.append('fields', JSON.stringify(mergedArray));
            fieldsData.append('username', document.querySelector('#username').value);
            const request = await axios.post('//furry-world.ru/console/post_update_profile.php?mode=fields', fieldsData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (request.data) {
                this.responseData = request.data;
                location.reload();
            }

        },
        async saveStatus(status) {
            this.showActionModal = true;
            let saveStatusRequest = await new axios.get('//furry-world.ru/console/get_update_user_status.php?mode=' + status + '&token=' + localStorage.getItem('token'));
            if (saveStatusRequest.data) {
                if (saveStatusRequest.data.status == 'success') {
                    notifications.generateNotification('Успех', saveStatusRequest.data.text);
                } else {
                    notifications.generateNotification('Ошибка', saveStatusRequest.data.text);
                }
            } else {
                notifications.generateNotification('Ошибка', 'Ошибка обновления данных, попробуйте еще раз');
            } this.showActionModal = false;
        },
        saveTags() { },
        createFolder() {
            location.href = '/gallery/personal/folder/create/';
        }
    }
}
</script>
<template>
    <AutosaveModal v-if="this.showActionModal" :saveText="'Ожидайте...'"></AutosaveModal>
    <div class="profile-container" style="overflow: hidden;" v-if="this.userLogin">
        <TabsRoot default-value="tab1" orientation="horizontal">
            <div class="personal-tabs tags">
                <div class="tags-wrapper" style="">
                    <div class="tags-scroll">
                        <TabsList aria-label=" tabs example">
                            <TabsTrigger value="tab1" class="tab-button"
                                :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                Профиль
                            </TabsTrigger>

                            <TabsTrigger value="tab2" class="tab-button"
                                :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                Альбомы
                            </TabsTrigger>
                            <TabsTrigger value="tab3" class="tab-button"
                                :class="[{ [mobileBtnClass]: userDevice.isMobile }]" @click="getFavs">
                                Избранное
                            </TabsTrigger>
                            <TabsTrigger @click="getChars" value="tab4" class="tab-button"
                                :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                Персонажи
                            </TabsTrigger>
                            <TabsTrigger value="tab6" class="tab-button"
                                :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                Адопты
                            </TabsTrigger>
                            <TabsTrigger value="tab5" class="tab-button"
                                :class="[{ [mobileBtnClass]: userDevice.isMobile }]">
                                Статистика
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>
            </div>
            <TabsContent value="tab1">
                <div class="profile-container">
                    <h2>Профиль</h2>
                    <!-- Profile Section -->
                    <div class="profile-section m-flex-column">
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
                            <div class="infoFields" v-if="userFields">
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

                <div class="profile-container">
                    <div class="h1">Авторизация</div>
                    <div class="profile-container">
                        <div class="h2">Пароль</div>
                        <div class="user-data">
                            <label>Введите новый пароль</label>
                            <input type="password" v-model="userNewPassword" class="infoFieldVal">
                        </div>
                        <div class="user-data">
                            <label>Подтвердите новый пароль</label>
                            <input type="password" v-model="userConfirmPassword" class="infoFieldVal">
                        </div>
                    </div>
                    <div class="btn update-btn" @click="updatePassword">Сохранить</div>
                </div>
                <div class="profile-container" style="">
                    <div class="h1">Статус</div>
                    <div class="profile-section" style="flex-wrap: wrap;">
                        <!-- User Data -->
                        <div class="user-data">
                            <SwitchButton :isChecked="userComms" :inputLabel='"Беру заказы"' :inputName="'comms'"
                                @click="saveStatus('comm')">
                            </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :isChecked="userTrades" :inputLabel='"Беру трейды"' :inputName="'trades'"
                                @click="saveStatus('trades')">
                            </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :isChecked="userRequests" :inputLabel='"Беру реквесты"'
                                :inputName="'requests'" @click="saveStatus('requests')"> </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :isChecked="userDrawNsfw" :inputLabel='"Рисую NSFW"' :inputName="'nsfw'"
                                @click="saveStatus('nsfw')">
                            </SwitchButton>
                        </div>
                    </div>
                </div>
                <TelegramLink :extTgID="this.extTgId"></TelegramLink>
                <TelegramPostsType :postType="this.extTgTypes"></TelegramPostsType>
                <!--      <TelegramModeration :moderation="this.extTgModeration"></TelegramModeration>-->

                <!--  <div class="profile-container">
                    <div class="h1">Управление тегами</div>
                    <div class="profile-section">
                        <Multiselect v-model="tags" placeholder="Выберите теги" :filter-results="false" :min-chars="2"
                            :resolve-on-load="false" :mode="'multiple'" :delay="3" :close-on-select="true" :limit="10"
                            :searchable="true" :options="async function (query) {
                                return await fetchTags(query)
                            }" />
                    </div>
                    <button class="update-btn" @click="saveFields">Сохранить</button>

                </div>-->

            </TabsContent>
            <TabsContent value="tab2">
                <div class="profile-container">
                    <h2>Галерея</h2>
                    <!-- Folders Section -->
                    <div class="folders-section">
                        <h3>Альбомы</h3>
                        <div class="comics-container mt-20 mb-20 flex-wrap">
                            <div class="card"
                                style="box-shadow: 0px 0px 4px 1px rgba(255,255,255,0.1);background-color: rgba(0,0,0,0.4);">
                                <div class="card__face card__face--front"
                                    style="display: flex;justify-content: center;align-items: center;">
                                    <div class="card__title"></div>
                                    <div class="circle" @click="createFolder"><span class="plus"></span> </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card__face card__face--front">
                                    <img src="@gallery/assets/images/all_works_cover.png" />
                                </div>
                                <div class="card__face card__face--overlay">
                                    <div class="card__title">Все работы</div>
                                    <div class="card__short-desc">Здесь лежат все ваши работы, которые не привязаны ни к
                                        одному альбому</div>
                                    <a class="card__link" href="/gallery/personal/folder/all/">Перейти к альбому</a>

                                </div>
                            </div>
                            <div class="card" v-for="folder in this.userFolders" :key="folder.id">
                                <div class="card__face card__face--front">
                                    <img :src=folder.picture />
                                </div>
                                <div class="card__face card__face--overlay">
                                    <div class="card__title">{{ folder.name }}</div>
                                    <div class="card__short-desc">{{ folder.description }}</div>
                                    <a v-if="folder.isComics == 0" class="card__link"
                                        :href="'/gallery/personal/folder/' + folder.code + '/'">Перейти к
                                        альбому</a>
                                    <a v-if="folder.isComics == 1" class="card__link"
                                        :href="'/gallery/personal/comics/' + folder.code + '/'">Перейти к
                                        альбому</a>
                                </div>
                            </div>
                        </div>
                    </div>

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
                <div class="h1">Ваши персонажи</div>
                <section id="user-character">
                    <div class="character-container">
                        <div class="character-header">
                            <h1>Добавить нового персонажа</h1>
                        </div>

                        <!-- Character Image -->
                        <div class="character-info">
                            <div class="field">
                                <label class="h2">Превью персонажа</label>
                                <img class="charAvatarRaw" v-if="charAvatarRaw" :src="charAvatarRaw">
                            </div>
                            <div @click="$refs.characterImage.click()" class="btn btn-default">
                                Нажмите чтобы загрузить изображение
                                <input type="file" accept="image/png, image/jpeg,image/gif" ref="characterImage"
                                    style="display: none" @change="newCharacterAvatar">
                            </div>
                        </div>
                        <div class="character-info">
                            <div class="field">

                                <label class="h2">Изображение в шапке профиля </label>
                                <img class="charheader-image" v-if="characterHeaderRaw" :src="characterHeaderRaw">

                            </div>
                            <div @click="$refs.characterHeader.click()" class="btn btn-default">
                                Нажмите чтобы загрузить изображение
                                <input type="file" accept="image/png, image/jpeg,image/gif" ref="characterHeader"
                                    style="display: none" @change="newCharacterHeader">
                            </div>
                        </div>
                        <div class="mt-20 character-info-wrapper">
                            <!-- Character Information -->
                            <div class="character-info" id="characterInfo">
                                <div class="field">
                                    <label for="age">Имя (макс. 256 символов)</label>
                                    <input type="text" id="age" v-model="charName" placeholder="Введите имя">
                                </div>

                                <div class="field">
                                    <label for="age">Возраст</label>
                                    <input type="text" id="age" v-model="charAge"
                                        placeholder="Введите возраст персонажа">
                                </div>
                                <div class="field">
                                    <label for="occupation">Вид (макс. 256 символов)</label>
                                    <input type="text" id="occupation" v-model="charSpecie" placeholder="Введите вид">
                                </div>
                                <div class="field">
                                    <label for="age">Краткое био (макс. 5000 символов)</label>
                                    <input type="text" id="age" v-model="charBio" placeholder="Краткое био">
                                </div>
                                <div class="field">
                                    <label for="age">Полное био (нет ограничений по символам)</label>
                                    <textarea v-model="charFullStory" placeholder="Полное био"></textarea>
                                </div>
                                <div class="field">
                                    <label for="rate">Возрастной рейтинг персонажа</label>
                                    <ModalRate v-model="charRate"></ModalRate>
                                </div>
                                <div class="field">
                                    <SwitchButton v-model="isMentionable" :inputLabel="'Разрешить отмечать другим'">
                                    </SwitchButton>
                                </div>
                                <div class="field">
                                    <SwitchButton v-model="isTradable" :inputLabel="'Адопт'">
                                    </SwitchButton>
                                </div>
                                <div v-if="isTradable">
                                    <div class="field error-text"
                                        style="color: #ff4d4d; margin-top: 10px; margin-bottom: 20px;">
                                        Внимание: Создание адопта необратимо! Вы не сможете перевести его обратно в
                                        обычного персонажа после сохранения.
                                    </div>
                                    <div class="field">
                                        <label for="adoptFixedPrice">Фиксированная цена</label>
                                        <input type="text" id="adoptFixedPrice" v-model="adoptFixedPrice"
                                            placeholder="Фикс. цена">
                                    </div>
                                    <div class="field">
                                        <label for="adoptMinPrice">Минимальная цена</label>
                                        <input type="text" id="adoptMinPrice" v-model="adoptMinPrice"
                                            placeholder="Мин. цена">
                                    </div>
                                    <div class="field">
                                        <label for="adoptAbPrice">Автовыкуп</label>
                                        <input type="text" id="adoptAbPrice" v-model="adoptAbPrice"
                                            placeholder="Автовыкуп">
                                    </div>
                                </div>
                                <!-- Add Custom Field Button -->
                                <div class="btn btn--success" id="addFieldButton" @click="saveCharacter">Сохранить</div>

                            </div>
                        </div>
                    </div>

                    <div class="character-container character-container__right">

                        <div class="image-grid" v-infinite-scroll="onLoadMore">
                            <div class="image-item" v-for="galleryImage in userChars" v-bind:key="galleryImage">
                                <a :href="'/gallery/author/' + this.userLogin + '/characters/' + galleryImage.code">
                                    <Image imageClass="" :imageSrc=galleryImage.picture
                                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                                    </Image>
                                </a>
                                <div class="character__name">{{ galleryImage.char.name }}</div>
                                <a class="btn btn--default"
                                    :href="'/gallery/author/' + this.userLogin + '/characters/' + galleryImage.code + '/edit/'">Редактировать</a>
                            </div>
                        </div>
                    </div>
                </section>

            </TabsContent>
            <TabsContent value="tab5">
                <h2>Статистика</h2>
                <PersonalStats></PersonalStats>
            </TabsContent>
            <TabsContent value="tab6">
                <ManageAdopts />
            </TabsContent>
        </TabsRoot>
    </div>
</template>
