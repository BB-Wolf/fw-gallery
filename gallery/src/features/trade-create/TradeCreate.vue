<template>
    <div class="trade-create card">
        <h2 class="mb-6 text-2xl font-bold text-gradient">Создать Трейд</h2>

        <div class="form-grid">
            <div class="form-group">
                <label>Название</label>
                <input type="text" v-model="form.name" placeholder="Введите название..." />
            </div>

            <div class="form-group">
                <label>Краткое описание</label>
                <input type="text" v-model="form.short" placeholder="Кратко о трейде..." />
            </div>

            <div class="form-group full-width">
                <label>Полное описание</label>
                <textarea v-model="form.full" placeholder="Подробное описание условий..." rows="4"></textarea>
            </div>

            <div class="form-group">
                <label>Рейтинг</label>
                <select v-model="form.rate">
                    <option value="0">SFW</option>
                    <option value="1">Questionable</option>
                    <option value="2">NSFW</option>
                </select>
            </div>

            <div class="form-group price-group">
                <div class="price-input">
                    <label>Фикс. цена</label>
                    <input type="number" v-model="form.adoptFixedPrice" placeholder="0" />
                </div>
                <div class="price-input">
                    <label>Мин. цена</label>
                    <input type="number" v-model="form.adoptMinPrice" placeholder="0" />
                </div>
                <div class="price-input">
                    <label>Автовыкуп</label>
                    <input type="number" v-model="form.adoptAbPrice" placeholder="0" />
                </div>
            </div>

            <div class="form-group">
                <label>Дата начала</label>
                <input type="date" v-model="form.dateStart" />
            </div>

            <div class="form-group">
                <label>Дата завершения</label>
                <input type="date" v-model="form.dateEnd" />
            </div>

            <div class="form-group checkbox-group">
                <label class="checkbox-container">
                    Завершено
                    <input type="checkbox" v-model="form.isCompleted" />
                    <span class="checkmark"></span>
                </label>
            </div>

            <div class="form-group full-width">
                <label>Изображение</label>
                <div class="upload-area" @click="$refs.fileInput.click()" :class="{ 'has-file': fileName }">
                    <div v-if="!previewUrl" class="upload-placeholder">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <span>Перетащите файл или нажмите для выбора</span>
                    </div>
                    <div v-else class="preview-container">
                        <img :src="previewUrl" alt="Preview" />
                        <div class="file-name">{{ fileName }}</div>
                    </div>
                    <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileChange" />
                </div>
            </div>
        </div>

        <div class="actions mt-8">
            <button @click="submit" class="btn btn-primary" :disabled="submitting">
                <span v-if="!submitting">Создать трейд</span>
                <span v-else class="loader"></span>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { notifications } from '@main/state';

export default {
    name: 'TradeCreate',
    data() {
        return {
            form: {
                name: '',
                short: '',
                full: '',
                rate: 0,
                adoptFixedPrice: '',
                adoptMinPrice: '',
                adoptAbPrice: '',
                dateStart: '',
                dateEnd: '',
                isCompleted: false,
                file: null
            },
            fileName: '',
            previewUrl: null,
            submitting: false
        }
    },
    methods: {
        handleFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.form.file = file;
                this.fileName = file.name;
                this.previewUrl = URL.createObjectURL(file);
            }
        },
        async submit() {
            if (!this.form.name || !this.form.file) {
                notifications.generateNotification('Внимание', 'Заполните название и выберите изображение');
                return;
            }

            this.submitting = true;
            try {
                const formData = new FormData();
                Object.keys(this.form).forEach(key => {
                    if (key === 'isCompleted') {
                        formData.append(key, this.form[key] ? '1' : '0');
                    } else if (this.form[key] !== null && this.form[key] !== '') {
                        formData.append(key, this.form[key]);
                    }
                });

                const response = await axios.post('//furry-world.ru/console/trades/post_create_trade.php', formData, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (response.data && response.data.status === 'success') {
                    notifications.generateNotification('Успешно', 'Трейд создан');
                    this.resetForm();
                    this.$emit('created');
                } else {
                    notifications.generateNotification('Ошибка', response.data.text || 'Не удалось создать трейд');
                }
            } catch (error) {
                console.error('Submission error:', error);
                notifications.generateNotification('Ошибка', 'Произошла непредвиденная ошибка');
            } finally {
                this.submitting = false;
            }
        },
        resetForm() {
            this.form = {
                name: '',
                short: '',
                full: '',
                rate: 0,
                adoptFixedPrice: '',
                adoptMinPrice: '',
                adoptAbPrice: '',
                dateStart: '',
                dateEnd: '',
                isCompleted: false,
                file: null
            };
            this.fileName = '';
            this.previewUrl = null;
            if (this.$refs.fileInput) this.$refs.fileInput.value = '';
        }
    }
}
</script>

<style scoped>
.trade-create {
    margin-top: 20px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;
    color: #e0e0e0;
    background-color: #2b2b2b;
    width: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

}

.text-gradient {
    background: linear-gradient(135deg, #6366f1, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.full-width {
    grid-column: span 2;
}

.trade-create .form-group {
    display: flex;
    gap: 0.5rem;
}

.trade-create .form-group label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #94a3b8;
}

input,
textarea,
select {
    padding: 0.75rem 1rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    color: white;
    transition: all 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.price-group {
    grid-column: span 2;
    display: flex;
    gap: 1rem;
}

.price-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.upload-area {
    border: 2px dashed rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(0, 0, 0, 0.1);
}

.upload-area:hover {
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.05);
}

.upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: #64748b;
}

.upload-placeholder i {
    font-size: 2.5rem;
}

.preview-container img {
    max-height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
}

.btn-primary {
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.loader {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.checkbox-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #94a3b8;
    user-select: none;
}

.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.checkbox-container:hover input~.checkmark {
    background-color: rgba(255, 255, 255, 0.05);
}

.checkbox-container input:checked~.checkmark {
    background-color: #6366f1;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-container input:checked~.checkmark:after {
    display: block;
}

.checkbox-container .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}
</style>
