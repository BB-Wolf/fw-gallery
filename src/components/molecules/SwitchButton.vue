<template>
    <div class="switch">
        <label>{{ this.inputLabel }}</label>
        <span class="switch-off">Нет</span>
        <input class="toggle-checkbox" type="checkbox" :name="this.inputName">
        <div class="toggle-container">
            <div class="toggle-button">
                <div class="toggle-button-circles-container">
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                    <div class="toggle-button-circle"></div>
                </div>
            </div>
        </div>
        <span class="switch-on">Да</span>
    </div>
</template>
<script>
export default
    {
        props: ['inputLabel', 'inputName']

    }
</script>
<style scoped>
.switch {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
}

.switch label {
    padding-right: 20px;
    color: white;
}

.switch-off,
.switch-on {
    color: white;
}


.toggle-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: .5em;
    padding: .125em;
    background-image: linear-gradient(to bottom, #d0c4b8, #f5ece5);
    box-shadow:
        0 1px 1px rgb(255 255 255 / .6),
    ;
}

.toggle-checkbox {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    z-index: 1;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.toggle-container {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: .375em;
    width: 3em;
    height: 1.5em;
    background-color: #e94545;
    box-shadow:
        inset 0 0 .0625em .125em rgb(255 255 255 / .2),
        inset 0 .0625em .125em rgb(0 0 0 / .4),
    ;
    transition: background-color .4s linear;

    .toggle-checkbox:checked+& {
        background-color: #03900d;
    }
}

.toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: .0625em;
    border-radius: .3125em;
    width: 1.375em;
    height: 1.375em;
    background-color: #e4ddcf;
    box-shadow:
        inset 0 -.0625em .0625em .125em rgb(0 0 0 / .1),
        inset 0 -.125em .0625em rgb(0 0 0 / .2),
        inset 0 .1875em .0625em rgb(255 255 255 / .3),
        0 .125em .125em rgb(0 0 0 / .5),
    ;
    transition: left .4s
        /*cubic-bezier(.65, 1.35, .5, 1)*/
    ;

    .toggle-checkbox:checked+.toggle-container>& {
        left: 1.5625em;
    }
}

.toggle-button-circles-container {
    display: grid;
    grid-template-columns: repeat(3, min-content);
    gap: .125em;
    position: absolute;
    margin: 0 auto;
}

.toggle-button-circle {
    border-radius: 50%;
    width: .125em;
    height: .125em;
    background-image: radial-gradient(circle at 50% 0, #f6f0e9, #bebcb0);
}
</style>