<template>
    <nav class="tags">
        <div v-if="!this.searchOpen" class="tags-wrapper">
            <div class="tags-scroll">
                <a v-for="tag in tags" v-bind:key="tag.link" :href="tag.link">{{ tag.title }}</a>
                <div class="radio-inputs">
                    <div class="search-tag" @click="enableSearch">
                        <svg fill="#000000" height="30px" width="30px" version="1.1" id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 488.4 488.4" xml:space="preserve">
                            <g>
                                <g>
                                    <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6
			s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2
			S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7
			S381.9,104.65,381.9,203.25z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.searchOpen" class="tags-wrapper" style="overflow: unset;">
            <div v-if="this.searchOpen" class="tag-container">
                <Multiselect v-model="tags" placeholder="Начните вводить текст" :filter-results="false" :min-chars="2"
                    :resolve-on-load="false" :mode="'multiple'" :delay="3" :close-on-select="true" :limit="10"
                    :searchable="true" :options="async function (query) {
                        return await fetchTags(query)
                    }" />
                <div class="radio-inputs">
                    <div class="search-tag close-btn" @click="resetSearch"></div>
                </div>
            </div>
        </div>
        <div v-if="!this.searchOpen" class="filter-go" @click="filterTags()">Фильтр</div>


    </nav>
</template>

<style scoped>
.filter-go {
    width: 98%;
    padding-left: 5px;
    padding-right: 5px;
    line-height: 2em;
    height: 40px;
    background-color: #959595;
    text-align: center;
    color: white;
    margin: 0 auto;
    border-radius: 5px;
    display: none;
}

.filter-go--active {
    display: block;
}

.multiselect-multiple-label {
    color: white
}

.search-tag {
    background-color: #959595;
    width: 60px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    flex: 0 60px;
    height: 39px;
}

input[type="text"] {
    margin: 0;
    width: 100%;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.searchFade-enter-active,
.searchFade-leave-active {
    transition: opacity 1s ease;
}

.searchFade-enter-from,
.searchFade-leave-to {
    opacity: 0;
}
</style>

<script>
import axios from 'axios';
import Multiselect from '@vueform/multiselect'


export default
    {
        components: {
            Multiselect
        },
        async created() {
            const mainTagsReq = await axios.get(`//furry-world.ru/console/get_main_tags_list.php`, {
            });
            const userTagsReq = await axios.get(`//furry-world.ru/console/get_tags_user_list.php`);

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
                tags: null,
                searchOpen: false,
            }
        },
        methods:
        {
            async fetchTags(tag) {
                const lookUpTag = await axios.get('//furry-world.ru/console/get_search_tags.php?q=' + tag);

                if (lookUpTag.data) {
                    document.querySelector('.filter-go').classList.add('filter-go--active');
                    return lookUpTag.data;
                } else {
                    //  return { label: 'По запросу ничего не найдено' };
                }
            },
            reloadData(state) {
                if (state == 'all') {
                    this.tags = this.mainTags
                } else {
                    this.tags = this.userTags
                }
            },
            enableSearch() {
                this.searchOpen = !this.searchOpen;
            },
            resetSearch() {
                this.searchOpen = false;
                this.tags = this.mainTags;
            },
            filterTags() {

            }
        }
    }
</script>