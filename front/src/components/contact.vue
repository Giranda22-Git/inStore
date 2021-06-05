<template>
    <div class="MainAbout">
        <div class="Maintext">
            <div class="textItem">Телефон: +7(707) 7777777</div>
            <div class="textItem">E-mail: rand.mail.ru</div>
            <div class="textItem">Адрес: ул. Центральная №1</div>
            <div class="textItem">Следите за нами:</div>
            <div class="textItem">
                <div class="ph">
                    <img src="../assets/Telega.png" alt="">
                    <img src="../assets/Insta.png" alt="">
                    <img src="../assets/WhatsApp.png" alt="">
                </div>
            </div>
        </div>
        <div class="photos">
            <div style="width: 100%; height: 100%"><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div>
        </div>
    </div>
</template>

<style scoped>
.ph{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    max-width: 120px;
}
.ph img{
    width: 30px; 
    height: 30px;
    cursor: pointer;
}
.MainAbout{
    margin: 20px 0 20px 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.Maintext{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.photos{
    width: 60%;
    height: 300px;
}
.textItem:not(:first-child){
    margin-top: 10px;
}

@media (max-width: 1000px) {
    .MainAbout{
        flex-direction: column;
        align-items: center;
    }
    .photos{
        margin-top: 20px;
    }
    .Maintext{
        width: 90%;
        align-items: center;
    }
    .photos{
        width: 90%;
        align-items: center;
        justify-items: center;
    }
    img{
        margin: 0 5px 0 5px;
    }
}
</style>