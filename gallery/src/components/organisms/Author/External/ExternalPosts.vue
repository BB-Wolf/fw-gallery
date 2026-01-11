<template>
    <section class="profile-posts">
        <PostsFeed v-if="posts.length" :posts="posts" />

        <div v-else class="posts-empty">
            <span class="h2">Автор пока молчит или отключил показ сообщений</span>
        </div>
    </section>
</template>

<script>
import PostsFeed from '@gallery/components/organisms/Author/External/ExternalFeed.vue';
import axios from 'axios';

export default {
    components:
    {
        PostsFeed
    },
    data() {
        return {
            posts: []
        }
    },
    async mounted() {
        let postsData = await axios.get('https://furry-world.ru/console/externals/telegram_feed.php?user=' + this.$route.params.user, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token") ?? '',
            }
        }
        );
        if (postsData.data) {
            this.posts = postsData.data;
        }
    }

}
    ;
</script>
