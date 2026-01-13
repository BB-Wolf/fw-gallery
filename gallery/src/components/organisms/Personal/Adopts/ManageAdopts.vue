<template>
    <div class="test">
        <div class="h1">Управление адоптами</div>
        <section id="manage-adopts">
            <!-- <div class="character-container">
                <CreateAdoptForm @created="refreshList" />
            </div> -->

            <!-- List Section -->
            <div class="character-container character-container__right">
                <AdoptsList ref="adoptsList" />
            </div>
        </section>
    </div>
</template>

<script>
// import CreateAdoptForm from './CreateAdoptForm.vue';
import AdoptsList from './AdoptsList.vue';

export default {
    name: 'ManageAdopts',
    components: {
        // CreateAdoptForm,
        AdoptsList
    },
    methods: {
        refreshList() {
            if (this.$refs.adoptsList) {
                this.$refs.adoptsList.fetchAdopts();
            }
        }
    }
}
</script>

<style scoped>
/* Reuse existing styles from Personal.vue or add specific ones */
#manage-adopts {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    #manage-adopts {
        flex-direction: column;
    }
}
</style>
