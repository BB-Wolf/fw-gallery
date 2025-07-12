<template>
    <div class="upload-tags mt-20">
        <label>Теги</label>
        <div class="muted">Теги отделяются запятой</div>
        <input id="tags-input" type="text" @change="$emit('update:modelValue', $event.target.value)">
    </div>
</template>
<script>
import Tagify from '@yaireo/tagify'

export default {
    mounted() {
        let input = document.getElementById("tags-input");
        this.tagifyObj = new Tagify(input, { pasteAsTags: true }).on('input', () => {
            if (this.debounce != 0) {
                this.debounce = 10;
            }
        });
    },
    data() {
        return {
            debounce: -1,
            tagifyObj: null
        }
    },
    watch: {
        debounce: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.debounce--;
                    }, 1000);
                }

                if (value == 0) {
                    let inp = document.querySelector('.tagify__input');
                    console.log(inp.innerHTML);
                    this.tagifyObj.addTags(inp.textContent)
                    inp.innerHTML = '';
                    this.debounce = -1;

                }
            },
            immediate: true // This ensures the watcher is triggered upon creation

        }
    }
}
</script>

<style>
.upload-tags {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>
<style src="@yaireo/tagify/dist/tagify.css"></style>