<template>
    <div class="profile-container">
        <div class="h1">Группа в Telegram </div>
        <div class="text muted">Для того, чтобы сообщения из Telegram отправлялись в ленту профиля, укажите ниже данные
            вашей группы.</div>
        <div class="text muted" style="font-weight:bold;">После сохранения, добавьте бота @fwfeedbot в вашу группу с
            правами администратора.
            (Обязательно уберите у бота все разрешения на управление группой или контентом)</div>
        <div class="mt-20 profile-container">
            <div class="user-data">
                <label>Введите название группы</label>
                <input type="text" v-model="tgName" class="infoFieldVal">
            </div>
            <div class="user-data">
                <label>или Введите ID группы</label>
                <input type="text" v-model="tgID" class="infoFieldVal">
            </div>
            <!-- <div class="user-data">
                <label>или Укажите инвайт-ссылку</label>
                <input type="text" v-model="tgInviteLink" class="infoFieldVal">
            </div> -->
        </div>
        <div class="btn update-btn" @click="updateTg">Сохранить</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'TelegramLink',
    data() {
        return {
            tgName: '',
            tgID: '',
            tgInviteLink: '',
            showActionModal: false,
        };
    },
    methods: {
        async updateTg() {
            let saveData = new FormData();
            saveData.append('tgName', this.tgName);
            saveData.append('tgID', this.tgID);
            saveData.append('tgInviteLink', this.tgInviteLink);
            // let saveData = {
            //     tgName: this.tgName,
            //     tgID: this.tgID,
            //     tgInviteLink: this.tgInviteLink,
            // };
            let response = await axios.post('https://furry-world.ru/console/tools/post_telegram_link.php', saveData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            if (response.data) {

            }
        },
    },
};
</script>