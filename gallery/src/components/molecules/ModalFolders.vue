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
import '@vueform/multiselect/themes/default.css'
import axios from 'axios';
const settings = userSettingsStore();

export default {
    components:
    {
        Multiselect
    },
    computed: {
        userFolders() {
            console.log(settings.folders);
            return settings.folders.folders;
        }
    },
    methods:
    {
        setValue(evt) {
            this.$emit('update:modelValue', evt)
        }
    }
}

</script>
