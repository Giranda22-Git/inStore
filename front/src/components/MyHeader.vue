<template>
    <div class = "Header">
        <div class="logo" style="font-weight: 600">
            <a href='/'><img src="../assets/Logo.png" alt=""></a>
        </div>
        <div class="place">
            <div style = "display: flex; align-items: center; justify-content: flex-end">
                <v-icon name="compass" color="white"></v-icon> Казахстан
            </div>
            <div class = 'text'>
                Жарокова 290, Утеген батыра 112
            </div>
        </div>
        <div class="contact">
            <div style = "display: flex; align-items: center; justify-content: center;">
                <v-icon name="phone-call" color="white"></v-icon>
                <div><a href="tel:+77770582248">+7(777) 058-22-48</a><br><a href="tel:+7771444409">+7(771) 444-44-09</a></div>
            </div>
            <div class = 'text'>
                igor.ignatiev2506@gmail.com
            </div>
        </div>
    </div>
</template>


<style scoped>
img{
    width: 70px;
    height: 70px;
}
a{
    text-decoration: none;
}
.Header{
    height: 8vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
svg{
    width: 22px;
    height: 22px;
    margin-right: 5px;
}
.place{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
}
.contact{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
}
.text{
    font-size: 0.9em;
}
@media (max-width: 800px) {
    .place{
        display: none;
    }
}
</style>