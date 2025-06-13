<template>
    <div class="upload-character mt-20 mb-20">
        <div>
            <label>Персонажи</label>
            <div class="muted">Персонажи разделяются запятой. <br /> Персонажи отсутствующие в списке будут созданы
            </div>
            <div class="input-container mt-20" @click="$refs.charsearch.focus()">
                <div contenteditable="plaintext-only" ref="charsearch" value="" id="chars-input" type="text"
                    @focus="placeCaretAtEnd" @input="this.debounce = 3"
                    @change="$emit('update:modelValue', $event.target.value)">
                </div>
                <span class="loader" v-if="this.debounce > 0"></span>
            </div>
            <div v-if="this.selectedChars.selected">
                <div class="btn btn--default" @dblclick="deleteChar($event)"
                    v-for="sChar in this.selectedChars.selected">
                    <span v-if="sChar" :data-charid="sChar.charId">{{
                        sChar.name }}
                    </span>
                </div>
            </div>
            <div class="characters-dropdown" v-if="this.userCharacters.length > 0">
                <div v-for="character in userCharacters" :key="character" :data-code="character.code"
                    class="characters-dropdown-items">
                    {{ character.character }}
                    <div @click="quickSelectChar((this.selectedChars.selected.length + 1), character.name)"
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

    <div id="characterModal" v-if="this.characterInfo">
        <div class="modal-content">
            <span class="close" @click="this.characterInfo = null">&times;</span>
            <div class="character-modal-info">
                <img :src="this.characterInfo.picture" alt="Character Image" class="character-image">
                <div class="character-details">
                    <div class="character-name"><strong>Имя:</strong>: {{ this.characterInfo.char.name }}</div>
                    <p class="character-author"><strong>Автор:</strong> {{ this.characterInfo.author }}</p>
                </div>
                <div class="btn-group">
                    <div class="btn btn--success"
                        @click="selectChar(this.characterInfo.id, this.characterInfo.char.name)">
                        Выбрать</div>
                    <div class="btn btn--danger" @click="this.characterInfo = null">Закрыть</div>
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
            deleteChar(evt) {
                console.log(this.selectedChars.selected);
                for (let i = 0; i < this.selectedChars.selected.length; i++) {
                    if (this.selectedChars.selected[i]) {
                        if (this.selectedChars.selected[i].charId == evt.currentTarget.children[0].dataset.charid) {
                            delete (this.selectedChars.selected[i]);
                        }
                    }
                }
                evt.currentTarget.remove();

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
                let el = document.querySelector('#chars-input');
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
                let el = document.querySelector('#chars-input');
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
<style scoped>
.btn-group {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 40px;
}

#chars-input {
    padding: 10px;
    display: inline-block;
    max-width: 100%;
    width: auto;
    outline: none;
}

.multiselect-single-label-text {
    color: white;
}

.characters-dropdown {
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100%;
    background-color: #444444;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    min-height: 140px;
}

.characters-dropdown::-webkit-scrollbar {
    width: 0.5em;
}

.characters-dropdown::-webkit-scrollbar-track {
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.3);
}

.characters-dropdown::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 2px solid slategrey;
}

.characters-dropdown-items {
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

#characterModal {
    position: absolute;
    left: 0px;
    top: 0px;
}

/* Контент модального окна */
.modal-content {
    background-color: #2a2a2a;
    color: #f0f0f0;
    padding: 2rem;
    border-radius: 12px;
    max-width: 800px;
    min-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    animation: slideUp 0.4s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.character-modal-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.character-image {
    width: 100%;
    max-width: 200px;
    border-radius: 8px;
    object-fit: cover;
    align-self: center;
}

.character-details {
    flex: 1;
}

.character-name {
    font-size: 1.8rem;
    margin: 0 0 0.5rem;
}

.character-author {
    font-size: 1rem;
    color: #ccc;
    margin-bottom: 1rem;
}

.character-bio {
    font-size: 1rem;
    line-height: 1.6;
}

.close {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s;
}

.close:hover {
    color: #fff;
}

@media (max-width: 600px) {
    .character-modal-info {
        flex-direction: column;
    }

    .character-image {
        align-self: flex-start;
    }
}

/* Анимации */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.loader {
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

@keyframes pulsIn {
    0% {
        box-shadow: inset 0 0 0 1rem #fff;
        opacity: 1;
    }

    50%,
    100% {
        box-shadow: inset 0 0 0 0 #fff;
        opacity: 0;
    }
}

@keyframes pulsOut {

    0%,
    50% {
        box-shadow: 0 0 0 0 #fff;
        opacity: 0;
    }

    100% {
        box-shadow: 0 0 0 1rem #fff;
        opacity: 1;
    }
}

.input-container {
    position: relative;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    gap: 1em;
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
</style>