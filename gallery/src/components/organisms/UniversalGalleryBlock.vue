<template>
    <div class="section-container">
        <div class="h2">Последние работы</div>

        <div class="masonry-gallery">
            <div v-for="(column, index) in columns" :key="index" class="masonry-column">
                <div v-for="item in column" :key="item.id" class="masonry-item fade-in">
                    <div v-if="showFav" class="gallery-item__hover--top">
                        <div class="fav-bookmark" :class="[{ ['fav-bookmark--active']: item.isFav }]"
                            @click="saveToFav($event.target, item.id)">
                            <svg fill="#000000" width="60px" height="60px" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
                            </svg>
                        </div>
                    </div>
                    <img :src="item.preview" :alt="item.title" @click="openFull(item)" loading="lazy" />
                    <div class="gallery-item__hover">
                        <div class="gallery-item__author"><a :href="item.link">{{ item.title
                        }}</a></div>
                        <div class="gallery-item__title"><b>Автор:</b> <a :href="'/gallery/author/' + item.userName">{{
                            item.userName }}</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:40px;">
            <div v-if="loading" class="loading-indicator">🔄 Загрузка...</div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'MasonryGallery',
    props: {
        showFav: {
            type: Boolean,
            default: false
        },
        galleryTitle: {
            type: String,
            default: 'Галерея'
        },
        galleryType:
        {
            type: String,
            default: 'new'
        },
        needInfinty: {
            type: String,
            default: 'n'
        },
        galleryUrl:
        {
            type: String,
            default: '//furry-world.ru/console/get_gallery_picture.php'
        }
    },
    data() {
        return {
            columns: [],
            columnCount: 6,
            offset: 1,
            limit: 20,
            loading: false,
            finished: false,
            windowWidth: window.innerWidth,
        };
    },
    mounted() {
        this.updateColumnCount();
        this.initColumns();
        this.loadMore();

        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        updateColumnCount() {
            const w = this.windowWidth;
            if (w > 1200) this.columnCount = 6;
            else if (w > 992) this.columnCount = 4;
            else if (w > 600) this.columnCount = 3;
            else this.columnCount = 1;
        },
        initColumns() {
            this.columns = [];
            for (let i = 0; i < this.columnCount; i++) {
                this.columns.push([]);
            }
        },
        async loadMore() {
            if (this.loading || this.finished) return;
            this.loading = true;

            try {
                const url = new URL(this.galleryUrl);
                url.searchParams.set('offset', this.offset);
                url.searchParams.set('limit', this.limit);

                const res = await fetch(url);
                if (!res.ok) throw new Error('Ошибка сети');

                const data = await res.json();
                if (data.length === 0) {
                    this.finished = true;
                    this.loading = false;
                    return;
                }

                for (const item of data) {
                    const minColIndex = this.findShortestColumn();
                    this.columns[minColIndex].push(item);
                }

                this.offset += 1;
            } catch (e) {
                console.error('Ошибка загрузки:', e);
            } finally {
                this.loading = false;
            }
        },
        findShortestColumn() {
            let minIndex = 0;
            let minLength = this.columns[0].length;
            for (let i = 1; i < this.columns.length; i++) {
                if (this.columns[i].length < minLength) {
                    minLength = this.columns[i].length;
                    minIndex = i;
                }
            }
            return minIndex;
        },
        handleScroll() {
            const scrollBottom = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.offsetHeight;

            if (scrollBottom >= pageHeight - 800) {
                this.loadMore();
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
            const oldCount = this.columnCount;
            this.updateColumnCount();
            if (this.columnCount !== oldCount) {
                // Перераспределяем уже загруженные картинки
                const allItems = this.columns.flat();
                this.initColumns();
                for (const item of allItems) {
                    const minColIndex = this.findShortestColumn();
                    this.columns[minColIndex].push(item);
                }
            }
        },
        openFull(item) {
            window.open(item.link, '_blank');
        },
    },
};
</script>

<style scoped>
.masonry-gallery {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 20px;
}

.masonry-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.masonry-item {
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    position: relative;
}

.masonry-item:hover {
    transform: scale(1.03);
}

.masonry-item img {
    display: block;
    width: 100%;
    height: auto;
    user-select: none;
}

/* Анимация появления */
.fade-in {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.title {
    padding: 8px;
    font-size: 16px;
    color: white;
    text-align: center;
    user-select: none;
}

.loading-indicator,
.finished-indicator {
    width: 100%;
    text-align: center;
    padding: 15px;
    color: #666;
    font-weight: 600;
}


.gallery-item__hover--top,
.gallery-item__hover {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    width: 100%;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.gallery-item__hover--top {
    top: -1000px;
}

.gallery-item__hover {
    bottom: -1000px;

}

.masonry-item:hover>.gallery-item__hover--top {
    top: -10px;
}

.masonry-item:hover>.gallery-item__hover {
    bottom: 0;
}

.gallery-item__hover a {
    color: white;
}

.gallery-item__hover .gallery-item__author a {
    font-weight: bold;
    text-decoration: underline;
}
</style>
