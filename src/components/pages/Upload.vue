<template>

    <div class="upload-container">
        <h2>Upload Image</h2>
        <form id="uploadForm">
            <!-- Image Upload -->
            <label for="imageUpload">Choose an image to upload</label>
            <input type="file" id="imageUpload" name="image" accept="image/*" required>

            <!-- Title -->
            <label for="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Enter image title" required>

            <!-- Description -->
            <label for="description">Description</label>
            <textarea id="description" name="description" placeholder="Enter a brief description" required></textarea>

            <!-- Folder Selection -->
            <label for="folder">Select Folder</label>
            <select id="folder" name="folder" required>
                <option value="">-- Select Folder --</option>
                <option value="nature">Nature</option>
                <option value="art">Art</option>
                <option value="travel">Travel</option>
                <option value="urban">Urban</option>
            </select>

            <!-- Submit Button -->
            <button type="submit" class="submit-btn">Upload</button>
        </form>
    </div>

</template>
<style scoped>
/* Container */
.upload-container {
    max-width: 600px;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

h2 {
    text-align: center;
    color: #ffcc00;
    margin-bottom: 20px;
}

/* Form styles */
form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 10px;
    font-weight: bold;
    color: #ddd;
}

input[type="text"],
input[type="file"],
textarea,
select {
    background-color: #1f1f1f;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 16px;
    outline: none;
}

input[type="text"]:focus,
textarea:focus,
select:focus {
    border-color: #ffcc00;
}

textarea {
    resize: none;
    height: 100px;
}

/* Submit Button */
.submit-btn {
    background-color: #ffcc00;
    color: #2b2b2b;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #e6b800;
}

/* Folder select */
select {
    background-color: #1f1f1f;
}

/* File upload styling */
input[type="file"] {
    padding: 5px;
    cursor: pointer;
    color: #ccc;
}
</style>