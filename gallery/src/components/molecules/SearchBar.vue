<template>
    <div id="searchbar">
        <div class="searchbar-container">
            <div class="msearch" @click="placeCaretAtEnd">
                <div contenteditable="plaintext-only" ref="searchbar" value="" id="searchinput" type="text"
                    @input="this.debounce = 2">
                </div>
                <span class="notify-note" v-if="!selectActive">Используйте
                    <b>@</b> для
                    поиска персонажей и <b>#</b> для поиска по HEX-цвету
                </span>
            </div>
            <div class="search-dropdown" v-if="this.searchItems.length > 0">
                <div v-for="item in searchItems" :key="item" :data-code="item.code" class="search-dropdown-items"
                    @click="selectItem(item, $event)">
                    <div style="display: flex; align-items: center;">
                        <img v-if="item.picture" :src="item.picture"
                            style="width: 30px; height: 30px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
                        <span>{{ item.character }}</span>
                    </div>
                </div>
            </div>
            <div class="searchbar-selections mt-20" v-if="this.selectedItems.length > 0 && this.selectedItems !== null">
                <div class="btn btn--default btn--tags" style="max-width: 100px;" v-for="sItem in selectedItems"
                    :key="sItem" @click="removeTag(sItem)">{{
                        sItem }}</div>
            </div>
            <div class="search-btn btn btn--default mt-20" @click="goSearch"> Поиск</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            searchItems: [],
            selectedItems: [],
            selectActive: false,
            debounce: -1
        }
    },
    created() {
        // let searchbar = document.querySelector('#searchinput');
        window.addEventListener('keydown', (e) => {
            if (e.which === 13) { // enter key
                e.preventDefault(); // prevents linebreak
                this.createTag();
                return false;
            }
        });
    },
    methods:
    {
        async createTag() {
            let textNode = document.querySelector('.msearch');
            let text = textNode.textContent;
            if (text.startsWith('@') || text.indexOf(' @') != -1) {
                let searchSub = [];
                if (text.startsWith('@') || text.indexOf(' @') != -1) {
                    searchSub = { mode: 'character', 'value': text }
                }
                let queryText = text.replace('@', '');
                let searchQuery = await new axios.post('https://furry-world.ru/console/get_characters_list.php?char=' + queryText, searchSub,
                    {
                        headers:
                        {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        }
                    }
                );
                if (searchQuery.data) {
                    this.searchItems = searchQuery.data;
                }
                this.debounce = -1;
            }
            if (text.startsWith('#') || text.indexOf(' #') != -1) {
                let clearedText = text.match(/#[^\s#]+/g);
                this.selectedItems = [...this.selectedItems, ...clearedText];
                let field = document.querySelector('#searchinput');
                field.textContent = field.textContent.replace(clearedText, '');
                if (field.textContent.length == 0) {
                    this.selectActive = false;
                }
                this.debounce = -1;

            }
        },
        placeCaretAtEnd() {
            let el = document.querySelector('#searchinput');
            if (el.textContent && el.textContent.length == 0) { this.selectActive = false; }
            this.selectActive = true;
            el.focus();
            if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
                let range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                let textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        },
        selectItem(item) {
            if (item.type === 'image' && item.link) {
                window.location.href = item.link;
                return;
            }
            let code = item.code;
            this.selectedItems = [...this.selectedItems, ...['@' + code]];
            this.searchItems = [];
            let field = document.querySelector('#searchinput');
            field.textContent = field.textContent.replace('@' + code, '');
            this.debounce = -1;
            this.selectActive = false;
        },
        removeTag(tag) {
            let index = this.selectedItems.indexOf(tag);
            if (index > -1) {
                this.selectedItems.splice(index, 1);
            }
        },
        goSearch() {
            let searchQuery = document.querySelector('#searchinput');
            let searchPath = new URLSearchParams({
                q: searchQuery.textContent,
                filter: JSON.stringify(this.selectedItems)
            });

            if (searchQuery != '' || this.selectedItems != '') {
                location.href = "/gallery/search/?" + searchPath.toString()
            }
        }


    },
    watch: {
        debounce: {
            async handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.debounce--;
                    }, 1300);
                }

                if (value == 0) {
                    let textNode = document.querySelector('.msearch');
                    let text = textNode.textContent;
                    if (text.startsWith('@') || text.indexOf(' @') != -1) {
                        let searchSub = [];
                        if (text.startsWith('@') || text.indexOf(' @') != -1) {
                            searchSub = { mode: 'character', 'value': text }
                        }
                        let queryText = text.replace('@', '');
                        let searchQuery = await new axios.post('https://furry-world.ru/console/get_characters_list.php?char=' + queryText, searchSub,
                            {
                                headers:
                                {
                                    'Content-Type': 'application/json',
                                    "Authorization": "Bearer " + localStorage.getItem("token"),
                                }
                            }
                        );
                        if (searchQuery.data) {
                            this.searchItems = searchQuery.data;
                        }
                        this.debounce = -1;
                    }
                    if (text.startsWith('#') || text.indexOf(' #') != -1) {
                        // Check for hex color pattern (strict hex chars, 3 or 6 length + #, but allowing typing so just check chars)
                        let lastWord = text.split(' ').pop();
                        if (/^#[0-9A-Fa-f]{1,6}$/.test(lastWord)) {
                            let formData = new FormData();
                            formData.append('color', lastWord);
                            let searchQuery = await new axios.post('https://furry-world.ru/console/get_search_by_color.php', formData,
                                {
                                    headers:
                                    {
                                        "Authorization": "Bearer " + localStorage.getItem("token"),
                                    }
                                }
                            );
                            if (searchQuery.data && searchQuery.data.length > 0) {
                                this.searchItems = searchQuery.data;
                            }
                            // Do not clear text or debounce yet, let user type or click
                        } else {
                            let clearedText = text.match(/#[^\s#]+/g);
                            if (clearedText) {
                                this.selectedItems = [...this.selectedItems, ...clearedText];
                                let field = document.querySelector('#searchinput');
                                field.textContent = field.textContent.replace(clearedText, '');
                                if (field.textContent.length == 0) {
                                    this.selectActive = false;
                                }
                                this.debounce = -1;
                            }
                        }

                    }
                }
            },
            immediate: true // This ensures the watcher is triggered upon creation
        }
    }
}
</script>
