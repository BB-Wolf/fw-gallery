<template>

    <div class="upload-container">
        <h2>Upload Image</h2>
        <form id="uploadForm">
            <!-- Image Upload -->
            <label for="imageUpload">Выберите изображеие для загрузки</label>
            <input type="file" id="imageUpload" name="image" accept="image/*" required>

            <!-- Title -->
            <label for="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Enter image title" required>

            <!-- Description -->
            <label for="description">Description</label>
            <textarea id="description" name="description" placeholder="Enter a brief description" required></textarea>

            <!-- Folder Selection -->
            <label for="folder">Выберите раздел</label>
            <select id="folder" name="folder" required>
                <option value="">-- Раздел --</option>
                <option value="nature">Nature</option>
                <option value="art">Art</option>
                <option value="travel">Travel</option>
                <option value="urban">Urban</option>
            </select>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn">Загрузить</button>
        </form>
    </div>

</template>
