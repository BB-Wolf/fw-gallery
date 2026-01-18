<template>
    <div class="ych-create card">
        <h2 class="mb-6 text-2xl font-bold text-gradient-ych">Создать YCH</h2>

        <div class="form-grid">
            <div class="form-group full-width">
                <label>Название YCH</label>
                <input type="text" v-model="form.name" placeholder="Например: Аукцион на слот..." />
            </div>

            <div class="form-group full-width">
                <label>Описание лота</label>
                <textarea v-model="form.full" placeholder="Опишите детали YCH, доступные виды, сложность..."
                    rows="4"></textarea>
            </div>

            <div class="form-group price-group">
                <div class="price-input">
                    <label>Начальная ставка</label>
                    <input type="number" v-model="form.adoptMinPrice" placeholder="0" />
                </div>
                <div class="price-input">
                    <label>Автовыкуп</label>
                    <input type="number" v-model="form.adoptAbPrice" placeholder="0" />
                </div>
            </div>

            <div class="form-group">
                <label>Дата начала аукциона</label>
                <input type="date" v-model="form.dateStart" />
            </div>

            <div class="form-group">
                <label>Дата завершения аукциона</label>
                <input type="date" v-model="form.dateEnd" />
            </div>

            <div class="form-group full-width">
                <label>Эскиз/Пример</label>
                <div class="upload-area" @click="$refs.fileInput.click()" :class="{ 'has-file': fileName }">
                    <div v-if="!previewUrl" class="upload-placeholder">
                        <i class="fas fa-paint-brush"></i>
                        <span>Загрузите эскиз YCH</span>
                    </div>
                    <div v-else class="preview-container">
                        <img :src="previewUrl" alt="YCH Preview" />
                        <div class="file-name">{{ fileName }}</div>
                    </div>
                    <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileChange" />
                </div>
            </div>
        </div>

        <div class="actions mt-8">
            <button @click="submit" class="btn btn-ych" :disabled="submitting">
                <span v-if="!submitting">Опубликовать YCH</span>
                <span v-else class="loader"></span>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { notifications } from '@main/state';

export default {
    name: 'YCHCreate',
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
                notifications.generateNotification('Внимание', 'Заполните название и загрузите изображение');
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

                // Reusing create trade endpoint for YCH as they are similar in current structure
                const response = await axios.post('//furry-world.ru/console/trades/post_create_trade.php', formData, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (response.data && response.data.status === 'success') {
                    notifications.generateNotification('Успешно', 'YCH успешно опубликован');
                    this.resetForm();
                    this.$emit('created');
                } else {
                    notifications.generateNotification('Ошибка', response.data.text || 'Не удалось создать YCH');
                }
            } catch (error) {
                console.error('Submission error:', error);
                notifications.generateNotification('Ошибка', 'Произошла ошибка при отправке');
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
.ych-create {
    margin-top: 20px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    color: #e0e0e0;
    background-color: #2b2b2b;
    width: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

}

.text-gradient-ych {
    background: linear-gradient(135deg, #f59e0b, #ef4444);
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

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
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
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
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
    border-color: #f59e0b;
    background: rgba(245, 158, 11, 0.05);
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

.btn-ych {
    background: linear-gradient(135deg, #f59e0b, #ef4444);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-ych:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}

.btn-ych:disabled {
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
</style>
