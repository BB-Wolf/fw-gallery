<template>
    <nav class="tags">
        <div class="radio-inputs">
            <label class="radio">
                <input type="radio" name="radio" value="all" checked="" v-on:click="reloadData('all')">
                <span class="name">Основные теги</span>
            </label>
            <label class="radio">
                <input type="radio" name="radio" value="user" v-on:click="reloadData('user')">
                <span class="name">Избранные теги</span>
            </label>
        </div>
        <a v-for="tag in tags" v-bind:key="tag.link" :href="tag.link">{{ tag.title }}</a>
    </nav>
</template>

<script>
import axios from 'axios';
//import { setupCache, buildWebStorage } from 'axios-cache-interceptor';


//const instance = Axios.create();
//const axios = setupCache(instance);
export default
    {
        async created() {
            const mainTagsReq = await axios.get(`http://img-fw.bb-wolf.site/console/get_tags_list.php`, {
            });
            const userTagsReq = await axios.get(`http://img-fw.bb-wolf.site/console/get_tags_user_list.php`);

            const [mainTags, userTags] = await Promise.all([mainTagsReq, userTagsReq]);

            if (mainTags.data) {
                this.mainTags = mainTags.data;
                this.tags = mainTags.data;
            }

            if (userTags.data) {
                this.userTags = userTags.data;
            }
        },
        data() {
            return {
                mainTags: null,
                userTags: null,
                tags: null
            }
        },
        methods:
        {
            reloadData(state) {
                if (state == 'all') {
                    this.tags = this.mainTags
                } else {
                    this.tags = this.userTags
                }
            }
        }
    }
</script>