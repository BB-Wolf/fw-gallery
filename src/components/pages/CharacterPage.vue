<script>
export default {
    data() {
        return {
            charAge: null,
            charName: null,
            charSpecie: null,
            charOwner: null,
            charBio: null,
            charFields: null,
            charAvatar: null,
        }
    }
}
</script>
<template>

    <section id="character">

        <div class="character-container">
            <!-- Character Image -->
            <img src="http://img-fw.bb-wolf.site/upload/uf/782/r1xykcg1p3e6nv183f1knj1s22fw2m2j.jpg"
                alt="Character Image" class="character-image">

            <div class="author-image">
                <div class="author-image__border">
                    <img src="http://img-fw.bb-wolf.site/upload/uf/782/r1xykcg1p3e6nv183f1knj1s22fw2m2j.jpg">
                </div>
            </div>
            <!-- Character Info -->
            <div class="character-info">
                <h1 id="character-name">Character Name</h1>
                <p id="character-age">Age: 25</p>
                <p id="character-short-bio">A brief summary about the character goes here.</p>
            </div>

            <!-- Character Full Bio -->
            <div class="character-bio">
                <h2>Full Biography</h2>
                <p id="character-full-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis
                    velit non auctor fermentum. Nullam vel felis eu elit porttitor tristique. Integer aliquam, nunc vel
                    pulvinar tincidunt, nisl mi sollicitudin eros, ac facilisis neque enim in metus. Vivamus egestas,
                    orci nec convallis sodales, ligula nulla eleifend quam, a tincidunt magna libero vitae quam.</p>
            </div>
        </div>
    </section>

</template>
<style scoped>
.character-container {
    width: 100%;
    max-width: 1900px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.character-image {
    width: 100%;
    max-height: 600px;
    object-fit: cover;
    object-position: 0% 10%;
}

.character-info {
    padding: 20px;
    text-align: center;
}

.character-info h1 {
    margin: 10px 0;
    font-size: 24px;
}

.character-info p {
    margin: 5px 0;
    font-size: 16px;
    color: #555;
}

.character-bio {
    width: 100%;
    padding: 20px;
}

.character-bio h2 {
    margin-bottom: 10px;
    font-size: 20px;
    color: #333;
}

.character-bio p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
}

@media (max-width: 600px) {
    .character-info h1 {
        font-size: 20px;
    }

    .character-info p,
    .character-bio p {
        font-size: 14px;
    }

    .character-bio h2 {
        font-size: 18px;
    }

    .author-image {
        display: none;
    }
}


.author-image__border {
    border-radius: 50%;
    overflow: hidden;
    width: 200px;
    height: 200px;
    border: 1px solid #ededed;
    margin: 10px auto;
    position: absolute;
    left: 60px;
    top: 480px;
}

.author-image__border img {

    max-width: 100%;
}
</style>
