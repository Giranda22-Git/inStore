<template>
    <div class = "Header">
        <div class="logo" style="font-weight: 600">
            <a href='/'>inStore</a>
        </div>
        <div class="place">
            <div style = "display: flex; align-items: center; justify-content: flex-end">
                <v-icon name="compass" color="white"></v-icon> Казахстан
            </div>
            <div class = 'text'>
                г. Алматы,улица Центральная №1
            </div>
        </div>
        <div class="contact">
            <div style = "display: flex; align-items: center; justify-content: flex-end">
                <v-icon name="phone-call" color="white"></v-icon> +7(777) 123-45-67
            </div>
            <div class = 'text'>
                rand.mail.ru
            </div>
        </div>
    </div>
</template>


<style scoped>
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