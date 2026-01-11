<template>
    <div class="profile-container">
        <div class="h1">Типы постов из Telegram</div>
        <div class="text muted">Здесь вы можете указать, какие типы сообщений из вашей группы в Telegram будут
            публиковаться в ленте вашего профиля.</div>
        <div class="profile-section" style="flex-wrap: wrap;">
            <!-- User Data -->
            <div class="user-data">
                <SwitchButton :isChecked="postTypes.text" :inputLabel='"Тексты"' :inputName="'texts'"
                    @click="togglePostType('text')">
                </SwitchButton>
            </div>
            <div class="user-data">
                <SwitchButton :isChecked="postTypes.images" :inputLabel='"Изображения"' :inputName="'images'"
                    @click="togglePostType('images')">
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
import axios from 'axios'

export default {
    name: 'TelegramPostsType',
    props:
    {
        postType: String
    },
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
    watch: {
        postType: {
            immediate: true,
            handler(val) {
                if (val == 'all') {
                    this.postTypes.images = true
                    this.postTypes.text = true
                }

                if (val == 'text') {
                    this.postTypes.images = false
                    this.postTypes.text = true
                }
                if (val == 'images') {
                    this.postTypes.images = true
                    this.postTypes.text = false
                }
                if (val == 'none') {
                    this.postTypes.images = false
                    this.postTypes.text = false
                }
            }
        }
    },
    methods: {
        // Example method to toggle post types
        async togglePostType(type) {
            this.postTypes[type] = !this.postTypes[type];
            let sendmode = '';
            if (this.postTypes.images == true && this.postTypes.text == true) {
                sendmode = 'all';
            }
            if (this.postTypes.images == true && this.postTypes.text != true) {
                sendmode = 'images';
            }
            if (this.postTypes.images != true && this.postTypes.text == true) {
                sendmode = 'text';
            }
            if (this.postTypes.images != true && this.postTypes.text != true) {
                sendmode = 'none';
            }

            let sendData = new FormData();
            sendData.append('mode', sendmode);
            let data = await axios.post('https://furry-world.ru/console/tools/post_telegram_type.php', sendData,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
            if (data.data) {

            }
        },
    },
};
</script>