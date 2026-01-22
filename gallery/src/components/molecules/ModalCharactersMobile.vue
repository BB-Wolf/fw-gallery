<template>
    <div class="upload-character mt-20 mb-20">
        <div>
            <label>Персонажи</label>
            <div class="muted">Персонажи разделяются запятой. <br /> Персонажи отсутствующие в списке будут созданы
            </div>
            <div class="input-container mt-20" @click="$refs.charsearch.focus()">
                <div contenteditable="plaintext-only" ref="charsearch" value="" id="chars-input" type="text"
                    @focus="placeCaretAtEnd" @input="debounce = 3"
                    @change="$emit('update:modelValue', $event.target.value)">
                </div>
                <span class="loader" v-if="debounce > 0"></span>
            </div>
            <div v-if="selectedChars.selected && selectedChars.selected.length > 0"
                class="selected-chars-container mt-15">
                <template v-for="sChar in selectedChars.selected" :key="sChar.charId">
                    <div class="char-chip" v-if="sChar">
                        <span :data-charid="sChar.charId">{{ sChar.name }}</span>
                        <span class="char-chip-remove" @click="deleteCharManual(sChar.charId)">&times;</span>
                    </div>
                </template>
            </div>
            <div class="characters-dropdown" v-if="userCharacters.length > 0">
                <div v-for="character in userCharacters" :key="character.id" :data-code="character.code"
                    class="characters-dropdown-items" @click="previewChar(character.code, character.usid, $event)">
                    <div class="character-search-info">
                        <img :src="character.picture" class="character-search-avatar" alt="">
                        <div class="character-search-details">
                            <span class="character-search-name">{{ character.name }}</span>
                            <span class="character-search-author">Автор: {{ character.authorlogin || 'неизвестен'
                            }}</span>
                        </div>
                    </div>
                    <div @click.stop="quickSelectChar(character.id, character.name)"
                        class="btn btn--default btn--rounded"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            width="20" height="20" viewBox="0 0 50 50">
                            <path
                                d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z">
                            </path>
                        </svg></div>
                </div>
            </div>
        </div>
    </div>

    <div id="characterModal" v-if="characterInfo">
        <div class="modal-content">
            <span class="close" @click="characterInfo = null">&times;</span>
            <div class="character-modal-info">
                <img :src="characterInfo.picture" alt="Character Image" class="character-image">
                <div class="character-details">
                    <div class="character-name"><strong>Имя:</strong>: {{ characterInfo.char.name }}</div>
                    <p class="character-author"><strong>Автор:</strong> {{ characterInfo.author }}</p>
                </div>
                <div class="btn-group">
                    <div class="btn btn--success" @click="selectChar(characterInfo.id, characterInfo.char.name)">
                        Выбрать</div>
                    <div class="btn btn--danger" @click="characterInfo = null">Закрыть</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default
    {
        data() {
            return {
                userCharacters: [],
                selectedChars: { selected: [], list: '' },
                characterInfo: null,
                debounce: -1,
                ctagDebounce: -1,
                isLoadingChar: false,
                isFounded: null,
                abort: new AbortController()
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

                    if (value == 1) {
                        this.fetchChars()
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
            ctagDebounce:
            {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.ctagDebounce--;
                        }, 1000);
                    }

                    if (value == 0) {
                        this.selectChar()
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            }
        },
        methods:
        {
            deleteCharManual(charId) {
                this.selectedChars.selected = this.selectedChars.selected.filter(char => char && char.charId !== charId);
                this.$emit('update:modelValue', this.selectedChars);
            },
            placeCaretAtEnd() {
                let el = document.querySelector('#chars-input');
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
            selectChar(id = '0', charName, evt = '') {
                let el = this.$refs.charsearch;
                this.selectedChars.selected = [...this.selectedChars.selected, ...[{ charId: id, name: charName }]];
                this.selectedChars.list = el.innerHTML;
                this.characterInfo = null;
                this.$emit('update:modelValue', this.selectedChars)
                this.userCharacters = [];
                el.innerHTML = '';
                this.isFounded = null;
            },
            quickSelectChar(id = '0', charName) {
                this.abort.abort();
                this.debounce = -1;
                this.characterInfo = null;
                let el = this.$refs.charsearch;
                this.selectedChars.selected = [...this.selectedChars.selected, ...[{ charId: id, name: charName }]];
                this.selectedChars.list = el.innerHTML;
                this.characterInfo = null;
                this.$emit('update:modelValue', this.selectedChars)
                this.userCharacters = [];
                this.resetData();
            },
            async previewChar(code, usid, evt = '') {

                if (!this.isLoadingChar) {
                    this.isLoadingChar = true;
                    let characterPreviewInfo = await new axios('https://furry-world.ru/console/get_character_preview.php?character=' + code + '&user=' + usid, {
                        signal: this.abort.signal
                    });
                    if (characterPreviewInfo.data) {
                        this.characterInfo = characterPreviewInfo.data;
                    }
                    this.isLoadingChar = false;
                }

            },
            async fetchChars() {
                let char = document.querySelector('#chars-input');
                char = char.innerHTML;
                this.ctagDebounce = 5;
                let charsData = await new axios('https://furry-world.ru/console/get_characters_list.php?char=' + char);
                if (charsData.data) {
                    this.userCharacters = charsData.data;
                    this.isFounded = true;
                    this.ctagDebounce = -1;
                } else {
                    this.isFounded = false;
                }

            },
            resetData() {
                this.isFounded = null;
                this.isLoadingChar = false;
                this.abort.abort();
                this.debounce = -1;
                this.ctagDebounce = -1;
                let el = document.querySelector('#chars-input');
                el.innerHTML = '';
                this.abort = new AbortController();
            }
        },
        mounted() {
            let el = document.querySelector('#chars-input');
            el.addEventListener('keydown', (e) => {
                if (e.code == 'Comma') {
                    this.selectChar((this.selectedChars.selected.length + 1), el.innerHTML);
                    this.resetData();
                }
                el.addEventListener('keyup', (e) => {
                    if (e.code == 'Comma') {
                        this.resetData();

                    }
                })

            });
        }
    }
</script>
