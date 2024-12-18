<template>
    <div class="steps">
        <div class="steps-container">
            <form id="mobileUpload">
                <!-- Step 1-->
                <div class="step-item" v-if="this.step == 1">
                    <div class="h2">Загрузка изображения</div>
                    <div class="form-group">
                        <label>Название работы</label>
                        <input type="text" name="title">
                    </div>
                    <div class="form-group">
                        <label>Изображение</label>
                        <input type="file" name="file" @change="makePreview">
                        <div class="steps-image__peview" v-if="image">
                            <img src="">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="step--next" @click="nextStep">Вперед</div>
                    </div>
                </div>
                <!-- End of step1-->
                <!-- Step 2-->
                <div class="step-item" v-if="this.step ==2">
                    <div class="h2">Описание</div>
                    <div class="form-group">
                        <label>Теги</label>
                        <input type="text" name="tags">
                    </div>
                    <div class="form-group">
                        <label>Папка</label>
                        <input type="text" name="folder">
                    </div>
                        <div class="form-group">
                            <div class="step--prev" @click="prevStep">Назад</div>
                            <div class="step--next" @click="nextStep">Вперед</div>
                        </div>
                    </div>
                    <!-- End of step2-->
            </form>
        </div>
    </div>
</template>
<style>
.steps{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: #696969;
    display:flex;
    flex-direction: column;
    gap:10px;
    justify-content: space-between;   
}

.steps-container{
    padding:10px 15px;
}

.steps-container .form-group
{
    color:white;
    display:flex;
    flex-direction:column;
}

.steps-container .form-group label
{
    font-size:18px;
}
</style>
<script>
export default {
    data() {
        return {
            stepsTotal: null,
            step:1,
            image: null,
            imageRaw: null
        }
    },
    methods:
    {
        makePreview() { },
        nextStep(){
            this.step++;
        },
        prevStep(){
            this.step--;
        }
    }
}
</script>