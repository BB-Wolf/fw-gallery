<template>
    <div class="autosave" v-show="this.saveText != ''">
        <div class="autosave-container">
            <span v-if="this.saveText != ''" class="save-text">{{ this.saveText }}</span>
            <div class="wait-container" style="margin:0 auto; transform: scale(0.3);">
                <div class="lds-roller" v-if="!this.responseData">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['saveText'],
    data() {
        return {
            autoSaving: false,
            workSaving: false,
        }
    }
}
</script>

<style lang="css" scoped>
.autosave {
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    right: 20px;
    background-color: #2b2b2b;
    box-shadow: 0px 0px 1px 1px rgba(255, 255, 255, 0.8);
    text-align: center;
    width: 220px;
    height: 40px;
    z-index: 10000;

}

.autosave-container {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
}

.autosave-container .lsd-roller {
    position: absolute;
    left: -21px;
}
</style>