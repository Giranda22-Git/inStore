<template>
    <div class="MainAbout">
        <div class="Maintext">
            <div class="textItem">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi omnis a, iste aspernatur dolore, nesciunt excepturi assumenda adipisci nemo, doloremque voluptate vero? Vitae quod dolorem ipsa ad, nulla quibusdam optio.</div>
            <div class="textItem">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae placeat, similique temporibus ab fuga voluptatibus? Perferendis id ratione ab esse?</div>
        </div>
        <div class="photos">
            <div class="photoItem">
                <div class="photo"><img style="height: 32px; width: 21px" src="../assets/sales.png" alt=""></div>
                <div class="text">Скидки до 50%</div>
            </div>
            <div class="photoItem">
                <div class="photo"><img style="height: 30px; width: 22px" src="../assets/safety.png" alt=""></div>
                <div class="text">Безопасно</div>
            </div>
            <div class="photoItem">
                <div class="photo"><img style="height: 30px; width: 27px" src="../assets/communication.png" alt=""></div>
                <div class="text">Быстрая коммуникация</div>
            </div>
            <div class="photoItem">
                <div class="photo"><img style="height: 32px; width: 29px" src="../assets/car.png" alt=""></div>
                <div class="text">Доставка{{'\xa0'}}по городу</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    align-items: center;
    justify-content: space-around;
}
.photos{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 100px);
    align-items: start;
    width: 40%;
    max-width: 300px;
}
.photoItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    height: 60px;
    text-align: center;
}
.textItem{
    max-width: 500px;
}
.textItem::first-letter{
    margin-left: 20px;
}
@media (max-width: 900px) {
    .MainAbout{
        flex-direction: column;
        align-items: center;
    }
    .photos{
        margin-top: 20px;
    }
    .Maintext{
        width: 90%;
    }
    .photos{
        width: 90%;
        align-items: center;
        justify-items: center;
    }
    .textItem:not(:first-child){
        margin-top: 10px;
    }
}
</style>