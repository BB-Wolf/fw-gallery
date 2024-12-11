<template>
    <section id="all-images-list" v-if="this.$route.params.name == 'all'">
        <div class="profile-container">
            <h2>Все изображения</h2>
        </div>
    </section>
    <section id="all-images-list" v-if="this.$route.params.name != 'all'">
        <div class="profile-container">
            <h2>Альбом {{ this.$route.params.name }}</h2>
        </div>
    </section>
    <section id="single-image-edit">
        <div class="profile-container d-flex g-20">
            <div class="left-block">
                <div>3335</div>
                <img src="">
            </div>
            <div class="right-block">
                <div class="group">
                    <label>Название</label>
                    <input type='text' value='123'>
                </div>
                <div class="group">
                    <label>Описание</label>
                    <textarea>233534534534543</textarea>
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

export default {
    components:{
    Multiselect        
    },
    data() {
        return {
            imagesList: []
        }
    },
    async created() {
        const getImagesList = await new axios.get('//img-fw.bb-wolf.site/console/get_gallery_picture.php?user=y', {
            headers: {
                token: localStorage.get('token')
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
label{
    color:white;
    font-weight:700;
    font-size:24px;
}

.d-flex{
    display:flex;
}
.g-20{
    gap:20px;
}
.left-block{
    flex:1;
}
.right-block{
    flex:3;
}
</style>