<template>
    <div class="overlay-bg" @click="closeModal"></div>
    <div id="login" class="modal">
        <div class="modal-wrapper">
            <div class="modal-body">

                <UploadImage></UploadImage>
            </div>
            <div class="booklets">
                <div class="booklet-item">1</div>
                <div class="booklet-item">2</div>
                <div class="booklet-item">3</div>
            </div>
        </div>
    </div>

</template>
<script>

import UploadImage from '@gallery/components/molecules/UploadImage.vue';
export default {
    components:
    {
        UploadImage
    }
}
</script>
<style>
.overlay-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
}


#login {
    max-width: 1200px;
    max-height: 85vh;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
    display: flex;
    background-color: #2b2b2b;
    color: #d9d9d9;
    flex-direction: row;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    transition: transform 0.3s;
}

.modal-wrapper {
    display: flex;
}

.modal-body {
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: #2b2b2b;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.5);
}

.booklets {
    position: absolute;
    right: -60px;
    display: flex;
    z-index: 9999;
    flex-direction: column;
    gap: 0.5rem;
    width: 70px;
}

.booklet-item {
    width: 80px;
    height: 80px;
    color: white;
    text-align: center;
    background-color: #2b2b2b;
    clip-path: inset(0 0 0 21%);
}
</style>
