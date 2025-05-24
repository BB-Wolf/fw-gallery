<template>
    <div class="upload-folder mt-20">
        <div class="mt-10">
            <label>Раздел</label>
            <Multiselect @change="setValue($event)" :options="userFolders" />
        </div>
    </div>
</template>
<script>
import Multiselect from '@vueform/multiselect'
import axios from 'axios';

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
    async mounted() {
        let getUserFolders = await new axios('//furry-world.ru/console/get_user_folders.php',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            }
        )
        if (getUserFolders.data) {
            this.userFolders = getUserFolders.data
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