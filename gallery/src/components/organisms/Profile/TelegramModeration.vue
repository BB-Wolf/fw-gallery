<template>
    <div class="profile-container">
        <div class="h1">Режим публикации</div>
        <div class="text muted">Здесь вы можете указать способ публикации сообщений.</div>
        <div class="text muted">При режиме автопубликации сообщения будут автоматически публиковаться в ленте вашего
            профиля. Учтите, что удаленные сообщения будут доступны в ленте профиля.</div>
        <div class="text muted">При режиме модерации сообщения будут изначальо загружаться в персональную ленту для
            подтверждения публикации</div>
        <div class="profile-section" style="flex-wrap: wrap;">
            <!-- User Data -->
            <div class="user-data">
                <Multiselect v-model="value" @change="setValue($event)" :options="moderateOptions" />
            </div>
        </div>
        <div class="btn update-btn mt-20" @click="updateTg">Сохранить</div>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
export default {
    name: 'TelegramModerationType',
    props:
    {
        moderation: String
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            // Example data properties
            moderateOptions: [
                'Автопубликация',
                //   'Модерация',
            ],
        };
    },
    methods: {
        // Example method to toggle post types
        togglePostType(type) {
            this.postTypes[type] = !this.postTypes[type];
        },
    },
};
</script>