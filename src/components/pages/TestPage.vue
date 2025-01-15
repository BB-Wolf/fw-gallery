<script>
import GalleryBlock from '../organisms/GalleryBlock.vue';
export default
    {
        components: {
            GalleryBlock
        }
    }

</script>

<template>
    <div class="container">
        <div class="title">Chapter 1: A New Beginning</div>
        <div class="rating">Rating: 4.5/5</div>
        <div class="tags">
            <span>Adventure</span>
            <span>Fantasy</span>
            <span>Drama</span>
        </div>
        <div class="content">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
                vestibulum. Cras venenatis euismod malesuada.
            </p>
            <p>
                Nulla facilisi. Donec mollis, erat ut scelerisque blandit, quam odio sollicitudin risus, at accumsan
                urna quam in lectus. Vivamus volutpat.
            </p>
        </div>
        <div class="pagination">
            <a href="#" class="disabled">&laquo; Previous</a>
            <a href="#">Next &raquo;</a>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #2b2b2b;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.title {
    font-size: 2em;
    margin-bottom: 10px;
}

.rating {
    font-size: 1em;
    color: #ffd700;
    margin-bottom: 10px;
}

.tags {
    margin-bottom: 20px;
}

.tags span {
    display: inline-block;
    margin-right: 5px;
    padding: 5px 10px;
    font-size: 0.9em;
    color: #ffffff;
    background-color: #444;
    border-radius: 12px;
}

.content {
    font-size: 1.2em;
    line-height: 1.6;
}

.pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.pagination a {
    color: #ffd700;
    text-decoration: none;
    padding: 10px 20px;
    background-color: #333;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.pagination a:hover {
    background-color: #444;
}

.pagination a.disabled {
    color: #666;
    background-color: #333;
    pointer-events: none;
}
</style>