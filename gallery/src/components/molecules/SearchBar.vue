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
                    @click="selectItem(item.code, item.usid, $event)">
                    {{ item.character }}
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
        selectItem(code) {
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
                        let clearedText = text.match(/#[^\s#]+/g);
                        this.selectedItems = [...this.selectedItems, ...clearedText];
                        let field = document.querySelector('#searchinput');
                        field.textContent = field.textContent.replace(clearedText, '');
                        if (field.textContent.length == 0) {
                            this.selectActive = false;
                        }
                        this.debounce = -1;

                    }
                }
            },
            immediate: true // This ensures the watcher is triggered upon creation
        }
    }
}
</script>
<style scoped>
#searchbar {
    padding: 10px;
    display: inline-block;
    max-width: 100%;
    width: 100%;
    outline: none;
}

#searchinput {
    outline: none;
    position: relative;
}

.notify-note {
    position: absolute;
}

.msearch {
    position: relative;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    gap: 1em;
    height: 50px;
    color: white;
    align-items: center;
    padding-left: 10px;
}

.search-dropdown {
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100%;
    background-color: #444444;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    min-height: 140px;
}

.search-dropdown::-webkit-scrollbar {
    width: 0.5em;
}

.search-dropdown::-webkit-scrollbar-track {
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.3);
}

.search-dropdown::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 2px solid slategrey;
}

.search-dropdown-items {
    color: white;
    padding: 10px;
    border-bottom: 2px solid black;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &:hover {
        background-color: #767676;
    }
}

#searchbar .loader {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: block;
    margin: 15px 0px;
    position: relative;
    background: #FFF;
    box-sizing: border-box;
    animation: shadowExpandX 2s linear infinite alternate;
}

.searchbar-selections {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}

@keyframes shadowExpandX {
    0% {
        box-shadow: 0 0, 0 0;
        color: rgba(255, 255, 255, 0.2);
    }

    100% {
        box-shadow: -24px 0, 24px 0;
        color: rgba(255, 255, 255, 0.8);
    }
}

.btn--rounded {
    height: 20px;
    width: 20px;
    align-self: flex-end;
    position: relative;
    z-index: 9999999;

}

.btn--rounded svg {
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(55%, 12%);
}

.btn--tags {
    width: auto;
    max-width: 2220px !important;
    word-break: break-all;
    overflow: hidden;
    height: auto;
    max-height: 40px;
    line-height: 1em;
}

.search-btn {
    text-align: center;
}
</style>