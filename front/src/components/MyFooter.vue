<template>
    <div class="Footer">
        <div class="textItem">Следите за нами:</div>
        <div class="textItem">
            <div class="ph">
                <img src="../assets/Telega.png" alt="">
                <img src="../assets/Insta.png" alt="">
                <img src="../assets/WhatsApp.png" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
.Footer{
    display: flex;
    flex-direction: column;
    height: 10vh;
    width: 100%;
    background: url('../assets/FooterFon.png');
    background-size: cover;
    align-items: center;
    justify-content: center;
    padding: 4vh 0 4vh 0;
}
img{
    margin: 5px 5px 0 5px;
    cursor: pointer;
}
</style>