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