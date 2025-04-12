<template>

    <header>
        <h1>Tags Collection</h1>
        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Search tags...">
            <button onclick="searchTags()">Search</button>
        </div>
    </header>

    <div class="sort-options">
        <button onclick="sortTags('count')">Sort by Count</button>
        <button onclick="sortTags('views')">Sort by Views</button>
        <button onclick="sortTags('rate')">Sort by Upload Rate</button>
    </div>

    <div class="tags-container" id="tagsContainer">
        <!-- Example Tag Items -->
        <div class="tag-item">
            <div class="tag-name">Tag 1</div>
            <div class="tag-metrics">
                Count: 50<br>
                Views: 2000<br>
                Rate: 5/day
            </div>
        </div>
        <div class="tag-item">
            <div class="tag-name">Tag 2</div>
            <div class="tag-metrics">
                Count: 30<br>
                Views: 1500<br>
                Rate: 3/day
            </div>
        </div>
        <!-- Additional tags will be dynamically loaded here -->
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    align-items: center;
}

.search-bar input {
    background-color: #333;
    border: 1px solid #555;
    padding: 5px 10px;
    color: #f0f0f0;
    border-radius: 4px;
    margin-right: 10px;
}

.search-bar button {
    background-color: #444;
    border: none;
    color: #f0f0f0;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.search-bar button:hover {
    background-color: #555;
}

.sort-options {
    display: flex;
    justify-content: flex-start;
    margin: 10px 20px;
    gap: 10px;
}

.sort-options button {
    background-color: #444;
    border: none;
    color: #f0f0f0;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.sort-options button:hover {
    background-color: #555;
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px;
}

.tag-item {
    background-color: #333;
    border-radius: 6px;
    padding: 10px;
    flex: 1 1 calc(25% - 20px);
    min-width: 200px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-weight: bold;
}

.tag-item:hover {
    background-color: #444;
}

.tag-name {
    font-size: 1.2rem;
}

.tag-metrics {
    font-size: 0.9rem;
    text-align: right;
}

@media (max-width: 768px) {
    .tag-item {
        flex: 1 1 calc(50% - 20px);
    }
}

@media (max-width: 480px) {
    .tag-item {
        flex: 1 1 100%;
    }

    header h1 {
        font-size: 1.2rem;
    }
}
</style>

<script>
function sortTags(criteria) {
    console.log(`Sorting by ${criteria}`);
    // Implement sorting logic here
}

function searchTags() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    console.log(`Searching for ${searchQuery}`);
    // Implement search logic here
}
</script>