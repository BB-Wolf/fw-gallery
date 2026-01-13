<template>
    <div class="create-adopt-form">
        <h3>Добавить новый адопт</h3>
        <div class="form-group mb-4">
            <label class="block mb-2 font-medium">Название</label>
            <input type="text" v-model="form.name" class="input-text w-full p-2 border rounded"
                placeholder="Название адопта" />
        </div>

        <div class="form-group mb-4">
            <label class="block mb-2 font-medium">Цена</label>
            <input type="number" v-model="form.price" class="input-text w-full p-2 border rounded" placeholder="0" />
        </div>

        <div class="form-group mb-4">
            <label class="block mb-2 font-medium">Описание</label>
            <textarea v-model="form.description" class="input-text w-full p-2 border rounded h-32"
                placeholder="Описание адопта"></textarea>
        </div>

        <div class="form-group mb-4">
            <label class="block mb-2 font-medium">Изображение</label>
            <div @click="$refs.fileInput.click()" class="btn btn-default cursor-pointer">
                {{ fileName || 'Выберите файл' }}
                <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileChange" />
            </div>
            <img v-if="previewUrl" :src="previewUrl" class="mt-4 max-w-xs rounded" />
        </div>

        <button @click="submit" class="btn btn--success" :disabled="submitting">
            {{ submitting ? 'Создание...' : 'Создать адопт' }}
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import { notifications } from '@main/state';

export default {
    name: 'CreateAdoptForm',
    data() {
        return {
            form: {
                name: '',
                price: '',
                description: '',
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
                notifications.generateNotification('Ошибка', 'Заполните обязательные поля (Название и Изображение)');
                return;
            }

            this.submitting = true;
            try {
                const formData = new FormData();
                formData.append('name', this.form.name);
                formData.append('price', this.form.price);
                formData.append('description', this.form.description);
                formData.append('file', this.form.file);

                // Assuming this endpoint based on convention
                const response = await axios.post('//furry-world.ru/console/post_create_adopt.php', formData, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (response.data && response.data.status === 'success') {
                    notifications.generateNotification('Успех', 'Адопт успешно создан');
                    this.resetForm();
                    this.$emit('created');
                } else {
                    notifications.generateNotification('Ошибка', response.data.text || 'Не удалось создать адопт');
                }
            } catch (error) {
                console.error('Error creating adopt:', error);
                notifications.generateNotification('Ошибка', 'Произошла ошибка при отправке');
            } finally {
                this.submitting = false;
            }
        },
        resetForm() {
            this.form = { name: '', price: '', description: '', file: null };
            this.fileName = '';
            this.previewUrl = null;
            if (this.$refs.fileInput) this.$refs.fileInput.value = '';
        }
    }
}
</script>

<style scoped>
.input-text {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
}
</style>
