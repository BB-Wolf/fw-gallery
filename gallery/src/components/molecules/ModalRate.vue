<template>
    <div class="upload-rate">
        <div>
            <label>Рейтинг</label>
            <Multiselect @change="$emit('update:modelValue', $event.target.value)" :options="rateOptions" />
        </div>
    </div>
</template>
<script>
import Multiselect from '@vueform/multiselect'
export default {
    components: {
        Multiselect,
    },
    data() {
        return {
            rateOptions: [
                '0+',
                '16+',
                '18+',
            ]
        }
    }
}
</script>