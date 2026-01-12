<template>
    <div class="upload-rate">
        <div>
            <label>Рейтинг</label>
            <Multiselect v-model="value" @change="setValue($event)" :options="rateOptions" />
        </div>
    </div>
</template>
<script>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
export default {
    components: {
        Multiselect,
    },
    data() {
        return {
            value: null,
            rateOptions: [
                '0+',
                '16+',
                '18+',
            ]
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
