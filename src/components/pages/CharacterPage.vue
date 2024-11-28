<script>
export default{
    data() {
        return {
                charAge:null,
                charName:null,
                charSpecie:null,
                charOwner:null,
                charBio:null,
                charFields:null,
                charAvatar:null,
        }
    }
}
</script>
<template>

    <section id="character">
        <div class="character-container">
            <div class="character-header">
                <h1>Character Name</h1>
            </div>
            
            <!-- Character Image -->
            <img src="https://via.placeholder.com/200" alt="Character Image" class="character-image">
            <div class="character-info-wrapper">
                <!-- Character Information -->
                <div class="character-info" id="characterInfo">
                    <div class="field">
                        <label for="age">Имя</label>
                        <input type="text" id="age" v-model="charName" placeholder="Enter age">
                    </div>
                    
                    <div class="field">
                        <label for="age">Возраст</label>
                        <input type="text" id="age" v-model="charAge" placeholder="Enter age">
                    </div>
                    <div class="field">
                        <label for="occupation">Вид</label>
                        <input type="text" id="occupation" v-model="charSpecie" placeholder="Enter occupation">
                    </div>
                    <div class="field">
                        <label for="age">Био</label>
                        <input type="text" id="age" v-model="charBio" placeholder="Enter age">
                    </div>
                        <!-- Add Custom Field Button -->
                    <button class="add-field-btn" id="addFieldButton">Add Custom Field</button>
                </div>
            </div>
        </div>
    </section>

</template>
<style scoped>
/* Basic styling */
.character-info-wrapper {
    display: flex;
}

/* Main container */
.character-container {
    background-color: #2b2b2b;
    max-width: 600px;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

/* Header section for name */
.character-header {
    text-align: center;
    margin-bottom: 20px;
}

.character-header h1 {
    color: #ffcc00;
    font-size: 1.8em;
    margin: 0;
}

/* Character image */
.character-image {
    width: 100%;
    max-width: 200px;
    border-radius: 8px;
    margin: 0 auto;
    display: block;
    background-color: #444;
    margin-bottom: 20px;
}

/* Personal Data Section */
.character-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.character-info label {
    color: #ddd;
    font-weight: bold;
}

.character-info input[type="text"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: #1f1f1f;
    color: #fff;
    border: 1px solid #444;
    outline: none;
    font-size: 16px;
}

.character-info input[type="text"]:focus {
    border-color: #ffcc00;
}

/* Add custom field button */
.add-field-btn {
    background-color: #ffcc00;
    color: #2b2b2b;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    margin-top: 20px;
    transition: background-color 0.3s ease;
}

.add-field-btn:hover {
    background-color: #e6b800;
}

/* Custom Field Styling */
.custom-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

/* Remove button for custom fields */
.remove-field-btn {
    background-color: #444;
    color: #ffcc00;
    padding: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 3px;
    align-self: flex-start;
    margin-top: 5px;
}

.remove-field-btn:hover {
    background-color: #ffcc00;
    color: #2b2b2b;
}
</style>
