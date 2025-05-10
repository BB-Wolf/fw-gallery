<template>
    <div class="content">
        <div class="section-container">
            <h1>Поиск</h1>
            <div class="search-block">
                <input type="text" v-model="searchQuery" placeholder="Поиск по названию или тегам" />
                <button @click="search">Поиск</button>
            </div>
            <div class="catalog"></div>
        </div>
    </div>
</template>