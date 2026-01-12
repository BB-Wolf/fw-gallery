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

