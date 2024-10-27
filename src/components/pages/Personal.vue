<template>

    <div class="profile-container">
        <h2>User Profile</h2>

        <!-- Profile Section -->
        <div class="profile-section">
            <!-- Avatar -->
            <div class="profile-avatar">
                <img src="https://via.placeholder.com/150" alt="Avatar" class="profile-avatar">
            </div>

            <!-- User Data -->
            <div class="user-data">
                <!-- Avatar Upload -->
                <label for="avatarUpload">Change Avatar</label>
                <label for="avatarUpload" class="file-upload-label">Choose file</label>
                <input type="file" id="avatarUpload" accept="image/*">

                <!-- Username -->
                <label for="username">Username</label>
                <input type="text" id="username" value="john_doe" required>

                <!-- Email -->
                <label for="email">Email</label>
                <input type="email" id="email" value="john_doe@example.com" required>
            </div>
        </div>

        <!-- Folders Section -->
        <div class="folders-section">
            <h3>Your Folders</h3>
            <ul class="folders-list">
                <li>
                    <span>Nature</span>
                    <button class="file-upload-label">Edit</button>
                </li>
                <li>
                    <span>Travel</span>
                    <button class="file-upload-label">Edit</button>
                </li>
                <li>
                    <span>Art</span>
                    <button class="file-upload-label">Edit</button>
                </li>
            </ul>
        </div>

        <!-- Update Button -->
        <button class="update-btn">Save Changes</button>

    </div>

</template>
<style scoped>
/* Container */
.profile-container {
    max-width: 100%;
    margin: 50px auto;
    background-color: #2b2b2b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

h2 {
    text-align: left;
    color: #ffcc00;
    margin-bottom: 20px;
}

/* Profile section */
.profile-section {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.profile-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #444;
    margin-right: 20px;
    object-fit: cover;
}

/* User data */
.user-data {
    flex-grow: 1;
}

.user-data label {
    display: block;
    font-weight: bold;
    color: #ddd;
    margin-bottom: 10px;
}

.user-data input[type="text"],
.user-data input[type="email"],
.user-data input[type="file"] {
    background-color: #1f1f1f;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 15px;
    font-size: 16px;
    outline: none;
}

.user-data input[type="text"]:focus,
.user-data input[type="email"]:focus,
.user-data input[type="file"]:focus {
    border-color: #ffcc00;
}

/* Folders section */
.folders-section {
    margin-bottom: 20px;
}

.folders-section h3 {
    color: #ffcc00;
    margin-bottom: 10px;
}

.folders-list {
    list-style-type: none;
    padding: 0;
}

.folders-list li {
    background-color: #1f1f1f;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.folders-list li span {
    color: #fff;
}

/* Update Button */
.update-btn {
    background-color: #ffcc00;
    color: #2b2b2b;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    width: 100%;
    transition: background-color 0.3s ease;
}

.update-btn:hover {
    background-color: #e6b800;
}

/* Section title */
.section-title {
    font-size: 18px;
    color: #ffcc00;
    margin-bottom: 10px;
}

.file-upload-label {
    cursor: pointer;
    display: inline-block;
    padding: 10px 20px;
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 15px;
}

.file-upload-label:hover {
    background-color: #ffcc00;
    color: #2b2b2b;
}

/* Hide file input */
input[type="file"] {
    display: none;
}
</style>