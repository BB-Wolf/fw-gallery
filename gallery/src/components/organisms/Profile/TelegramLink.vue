<template>
    <div class="profile-container">
        <div class="h1">Группа в Telegram </div>
        <div class="text muted">Для того, чтобы сообщения из Telegram отправлялись в ленту профиля, укажите ниже данные
            вашей группы.</div>
        <div class="text muted" style="font-weight:bold;">После сохранения, добавьте бота @fwfeedbot в вашу группу с
            правами администратора.
            (Обязательно уберите у бота все разрешения на управление группой или контентом после получения ID канала
            командой /getid)</div>
        <div class="mt-20 profile-container">
            <div class="user-data">
                <label>Введите ID группы</label>
                <div class="text muted">ID можно получить отрпавив команду <b>/getid</b> после добавления бота в канал
                </div>
                <div class="text muted">Лента работает в тестовом режиме, потому ответы бота могут занимать до 1 минуты
                </div>
                <input type="text" v-model="this.tgID" class="infoFieldVal">
            </div>
        </div>
        <div class="btn update-btn" @click="updateTg">Сохранить</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'TelegramLink',
    props:
    {
        extTgID: String
    },
    data() {
        return {
            tgID: this.extTgID,
            showActionModal: false,
        };
    },
    watch: {
        extTgID: {
            immediate: true,
            handler(val) {
                this.tgID = val;
            }
        }
    },
    methods: {
        async updateTg() {
            let saveData = new FormData();
            saveData.append('tgID', this.tgID);
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