<template>
    <section id="all-images-list" v-if="this.$route.params.name == 'all'">
        <div class="profile-container">
            <h2>Все изображения</h2>
            <div class="image-grid">
                <div class="image-item" v-for="galleryImage in imagesList" v-bind:key="galleryImage.id">
                    <Image @click="editPicture(galleryImage.id)" imageClass="slide" :imageSrc=galleryImage.picture
                        :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                    </Image>
                </div>
            </div>
        </div>
    </section>
    <section id="all-images-list" v-if="this.$route.params.name != 'all'">
        <div class="profile-container">
            <h2>Альбом {{ this.$route.params.name }}</h2>
            <div class="image-grid">
                <div class="image-item" v-for="galleryImage in imagesList" v-bind:key="galleryImage.id">
                    <a :href="galleryImage.link">
                        <Image imageClass="slide" :imageSrc=galleryImage.picture
                            :imageTitle="galleryImage.title + ' от ' + galleryImage.userName" imageAlt="">
                        </Image>
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section id="single-image-edit" v-if="this.currentImage">
        <div class="profile-container d-flex g-20">
            <div class="left-block">
                <div class="h2">{{ this.currentImage.title }}</div>
                <img :src="this.currentImage.picture">
                <div class="btn"> 23</div>
            </div>
            <div class="right-block">
                <div class="group">
                    <label>Название</label>
                    <input type='text' :value=this.currentImage.title>
                </div>
                <div class="group">
                    <label>Описание</label>
                    <textarea v-model="this.currentImage.description"> </textarea>
                </div>
                <div class="group">
                    <label>Теги</label>
                    <Multiselect v-model="tags" placeholder="Выберите теги" :filter-results="false" :min-chars="2"
                        :resolve-on-load="false" :mode="'multiple'" :delay="3" :close-on-select="true" :limit="10"
                        :searchable="true"></Multiselect>
                </div>
                <div class="group">
                    <label>Раздел</label>
                    <Multiselect v-model="tags" placeholder="Выберите теги" :filter-results="false" :min-chars="2"
                        :resolve-on-load="false" :mode="'multiple'"></Multiselect>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import Image from '../atoms/Image.vue';

export default {
    components: {
        Multiselect,
        Image
    },
    data() {
        return {
            imagesList: [],
            currentImage: null,
        }
    },
    methods: {
        editPicture(img) {
            for (let i = 0; i < this.imagesList.length; i++) {
                if (this.imagesList[i].id == img) {
                    this.currentImage = this.imagesList[i];
                }
            }
            setTimeout(() => {
                const element = document.getElementById("single-image-edit");
                element.scrollIntoView({ behavior: "smooth" });
            }, 500);

        }
    },
    async created() {
        let url;
        if (this.$route.params.name == 'all') {
            url = '//img-fw.bb-wolf.site/console/get_gallery_picture.php?user=' + localStorage.getItem('token');
        } else {
            url = '//img-fw.bb-wolf.site/console/get_gallery_picture.php?user=y';
        }
        const getImagesList = await new axios.get(url, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        });
        if (getImagesList.data) {
            this.imagesList = getImagesList.data;
        }
    }
}
</script>
<style scoped>
h2 {
    text-align: left;
    color: #fff;
    margin-bottom: 20px;
}

.profile-container {
    max-width: 100%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

label {
    color: white;
    font-weight: 700;
    font-size: 24px;
}

.d-flex {
    display: flex;
}

.g-20 {
    gap: 20px;
}

.left-block {
    flex: 1;
}

.left-block img {
    max-width: 480px;

}

.right-block {
    flex: 3;
}

.image-grid {
    gap: 10px;
}

.image-item {
    width: 480px;
    overflow: hidden;
    position: relative;

}

.image-item:hover>.image-item__hover {
    bottom: 0px;
}

.image-item:hover>.image-item__hover--top {
    bottom: unset;
    top: -50px;
}

.image-item__hover--top:hover {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.365, 1);
    top: -10px !important;
}

.image-item__hover,
.image-item__hover--top {
    display: flex;
    position: absolute;
    bottom: -1000px;
    background-color: rgba(0, 0, 0, .4);
    max-width: 460px;
    width: 100%;
    margin: 0 auto;
    height: auto;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    color: white;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}




.image-item a {
    color: white;
    font-weight: bold;
}
</style>