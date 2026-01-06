<template>
    <div class="profile-container">
        <div class="h1">Типы постов из Telegram</div>
        <div class="text muted">Здесь вы можете указать, какие типы сообщений из вашей группы в Telegram будут
            публиковаться в ленте вашего профиля.</div>
        <div class="profile-section" style="flex-wrap: wrap;">
            <!-- User Data -->
            <div class="user-data">
                <SwitchButton :isChecked="postTypes.text" :inputLabel='"Тексты"' :inputName="'texts'"
                    @click="saveStatus('texts')">
                </SwitchButton>
            </div>
            <div class="user-data">
                <SwitchButton :isChecked="postTypes.images" :inputLabel='"Изображения"' :inputName="'images'"
                    @click="saveStatus('images')">
                </SwitchButton>
            </div>
            <!--  <div class="user-data">
                <SwitchButton :isChecked="postTypes.videos" :inputLabel='"Видео"' :inputName="'videos'"
                    @click="saveStatus('videos')">
                </SwitchButton>
            </div>-->
        </div>
    </div>
</template>

<script>
import SwitchButton from '@gallery/components/molecules/SwitchButton.vue';
export default {
    name: 'TelegramPostsType',
    components: {
        SwitchButton,
    },
    data() {
        return {
            // Example data properties
            postTypes: {
                images: true,
                videos: false,
                text: true,
            },
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