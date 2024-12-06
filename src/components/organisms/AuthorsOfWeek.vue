<template>
    <section id="author-week" class="mt-20" v-if="authorList">
        <div class="h2">Художники недели</div>
        <div class="portrait-container">
            <div class="portrait-card" v-for="author in authorList" :key="author">
                <a class="portrait-border" :href="'/author/' + author.login"><img :src=author.picture>
                </a>
                <div class="portrait-card-author">{{ author.login }}</div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            authorList: null,
        }
    },
    async created() {
        const authorListGet = await new axios.get('//img-fw.bb-wolf.site/console/get_ranked_author_list.php');
        if (authorListGet.data) {
            this.authorList = authorListGet.data;
        }
    }
}
</script>

<style scoped>
#author-week {
    padding-left: 20px;
    padding-right: 20px;
}

.portrait-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
}

.portrait-card {
    color: white;
    text-align: center;
}

.portrait-border {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0px 0px 1px 5px rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    overflow: hidden;

}

.portrait-border img {
    max-width: 100%;
}

.portrait-card-author {
    padding-top: 10px;
    font-weight: bold;
}
</style>