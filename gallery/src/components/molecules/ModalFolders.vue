<template>
    <div class="upload-folder mt-20">
        <div class="mt-10">
            <label>Раздел</label>
            <Multiselect @change="setValue($event)" :options="userFolders" />
        </div>
    </div>
</template>
<script>
import { userSettingsStore } from '@main/state';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
const userSettings = userSettingsStore();

export default {
    components:
    {
        Multiselect
    },
    data() {
        return {
            userFolders: [],
        }
    },
    mounted() {
        this.userFolders = userSettings.folders;
    },
    methods:
    {
        setValue(evt) {
            this.$emit('update:modelValue', evt)
        }
    }
}

</script>