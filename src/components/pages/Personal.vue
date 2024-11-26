<script>
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import InputText from '../atoms/InputText.vue';
import SwitchButton from '../molecules/SwitchButton.vue';

export default {
    components:
    {
        TabsContent,
        TabsRoot,
        TabsList,
        TabsTrigger,
        InputText,
        SwitchButton

    },
    props: {
        userLogin: null,
        userTitle: null,
        userFolders: null,
        userAvatar: null,
        userFields: {
            default: [{
                type: "text",
                label: "Somefield",
                value: "Text abr"
            },
            {
                type: "text",
                label: "Somefield",
                value: "Text a2br"
            },
            {
                type: "text",
                label: "Somefield",
                value: "Text abr"
            }]
        },

    },
    methods: {
        saveProfile() { },
        addField() {
            console.log("addField");
            let buttonAdd = document.querySelector(".add-fields");
            let field = '<div class="newfield-container"><label>Название поля:</label><input type="text" placeholder="Введите название поля" class="new-label" ><textarea class=""></textarea></div>';
            buttonAdd.insertAdjacentHTML('beforebegin', field);

        },
    }
}
</script>
<template>
    <div class="profile-container" style="overflow: hidden;">
        <TabsRoot default-value="tab1" orientation="horizontal">
            <div class="author-tabs">
                <TabsList aria-label="tabs example">
                    <TabsTrigger value="tab1" class="tab-button">
                        Профиль
                    </TabsTrigger>
                    <TabsTrigger value="tab3" class="tab-button">
                        Галерея
                    </TabsTrigger>
                    <TabsTrigger value="tab4" class="tab-button">
                        Избранное
                    </TabsTrigger>
                    <TabsTrigger value="tab5" class="tab-button">
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
                            <img src="https://via.placeholder.com/150" alt="Avatar" class="profile-avatar">
                        </div>
                        <div class="user-data">

                            <!-- Avatar Upload -->
                            <label for="avatarUpload">Change Avatar</label>
                            <label for="avatarUpload" class="file-upload-label">Choose file</label>
                            <input type="file" id="avatarUpload" accept="image/*">
                        </div>
                    </div>
                </div>
                <div class="profile-container">
                    <div class="h1">Инфо</div>
                    <div class="profile-section">
                        <!-- User Data -->
                        <div class="user-data">

                            <!-- Username -->
                            <label for="username">Никнейм</label>
                            <input type="text" id="username" value="" required>
                            <InputText v-for="userField in userFields" :key="userField" :inputLabel="userField.label"
                                :inputValue="userField.value"> </InputText>
                            <div class="add-fields" @click="addField">Добавить поле</div>
                        </div>
                    </div>
                    <!-- Update Button -->
                    <button class="update-btn">Сохранить</button>

                </div>
                <div class="profile-container" style="">
                    <div class="h1">Статус</div>
                    <div class="profile-section" style="flex-wrap: wrap;">
                        <!-- User Data -->
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Беру заказы"' :inputName="'comms'"> </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Беру трейды"' :inputName="'trades'"> </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Беру реквесты"' :inputName="'requests'"> </SwitchButton>
                        </div>
                        <div class="user-data">
                            <SwitchButton :inputLabel='"Рисую NSFW"' :inputName="'nsfw'"> </SwitchButton>
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
                        <h3>Your Folders</h3>
                        <ul class="folders-list">
                            <li>
                                <span>Nature</span>
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
                Tab three content
            </TabsContent>
        </TabsRoot>
    </div>
</template>
<style scoped>
.add-fields {
    color: #fff;
    background-color: #e6b800;
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
</style>