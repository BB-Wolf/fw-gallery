<template>
    <section id="author-week" class="mt-20">
        <div class="h2">Художники недели</div>
        <div class="portrait-container" v-if="authorList.length != 0">
            <div class="portrait-card" v-for="author in authorList" :key="author">
                <a class="portrait-border" :href="'/author/' + author.login"><img :src=author.picture>
                </a>
                <div class="portrait-card-author">{{ author.login }}</div>
            </div>
        </div>
        <div class="portrait-container--empty" v-else style="width:90%;justify-content: unset;">
            <div class="portrait-options-noone">
                <div class="portrait-dragon">
                    <img src="../../assets/images/drakon6.png">
                </div>
                <div>
                    <div class="h2" style="padding: 0;"> Увы, на этой неделе здесь нет отличившихся художников. </div>
                    <p class="mt-20">Как попасть в этот блок? Есть несколько способов.</p>
                    <ul style="display: flex; flex-direction: column;">
                        <li>1. Оставлять больше работ за прошлую неделю</li>
                        <li> 2. Каждый арт совпадающий с палитрой дня - приносит баллы. По результату баллов прошлого
                            дня -
                            можно
                            попасть в этот блок.</li>
                        <li>3. Участвовать в конкурсах от администрации</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            authorList: '',
        }
    },
    async mounted() {
        let authorListGet = await new axios.get('//furry-world.ru/console/get_ranked_author_list.php');
        if (authorListGet.data) {
            this.authorList = authorListGet.data;
        }
    }
}
</script>

<style scoped>
.portrait-options-noone {
    position: relative;
    text-align: left;
    color: white;
    margin: 0;
}

.portrait-options-noone {
    display: flex;
}

.portrait-dragon {
    width: 240px;
}

.portrait-dragon img {
    max-width: 100%;
}




#author-week {
    padding-left: 20px;
    padding-right: 20px;
}

.portrait-container,
.portrait-container--empty {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
}

.portrait-container--empty {
    margin: 40px 0px 0px 0px;
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