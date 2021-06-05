<template>
    <div class="Products">
        <div class = "title" v-if="type == 'search'">
            <div class="searchInfo">Результаты поиска: {{name}}</div>
            <div class = "amount">Всего найдено продуктов: {{items.length}}</div>
        </div>
        <div class = "title" v-else-if="type == 'category'">
            <div class="searchInfo">Товары в категории {{category}}</div>
            <div class = "amount">Всего найдено продуктов: {{items.length}}</div>
        </div>
        <div class = "mainBlock">
            <div class="filter">
                <div class="defFilter">
                    <h3>Фильтр</h3>
                    <h4 class = 'price'>Цена</h4>
                    <div class="difference">
                        <input type="number"> -
                        <input type="number">
                    </div>
                    <div class="success" @click="FilterPrice">Применить цену</div>
                    <h4 class = 'price'>По подстроке</h4>
                    <div class="alphabet">
                        <input type="text">
                        <div class = "button" @click="FilterSubStr">Применить</div>
                    </div>
                </div>
            </div>
            <div class="items">
                <div v-for="(i, el) in Items" :key='el' class="swiper-slide" >
                     <RouterLink :to=" `product/${i._id}`"><img :src='i.images[0].clientPath' alt=""></RouterLink>
                    <div style="width: 80%; margin-top: 6px; margin-bottom: 6px">{{i.name}}</div>
                     <RouterLink :to=" `product/${i._id}`"><div class="price2">{{i.price}} тг.</div></RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        items: Array,
        name: String,
        type: String,
        category: String
    },
    watch: {
        items: function (val) {
            this.Items = val
        }
    },
    data: () => ({
        Items: []
    }),
    mounted(){
        this.Items = this.items
        console.log(this.items);
    },
    methods:{
        FilterPrice(){
            var Fnum = document.querySelectorAll('input')[1].value
            var Snum = document.querySelectorAll('input')[2].value
            console.log(Fnum);
            console.log(Snum);
            this.Items = this.items.filter( el => el.price >= Number(Fnum) && el.price <= Number(Snum))
            console.log(this.Items);
        },
        FilterSubStr(){
            var Ftext = document.querySelectorAll('input')[3].value
            this.Items = this.items.filter( el => el.name.includes(Ftext))
        }
    }
}
</script>

<style scoped>
*{
    font-weight: 100;
}
a{
    width: 100%;
    height: 100%;
    text-decoration: none;
    text-align: center;
}
input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.swiper-slide img {
    height: 200px;
    width: 260px;
    object-fit: cover;
}
.price2{
    padding: 4px 15% 4px 15%;
    border: 1px solid rgb(202, 121, 0);
    border-radius: 4px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    cursor: pointer;
    width: 70%;
    text-align: center;
}
.Products{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 3vh;
    margin-bottom: 3vh;
}
.searchInfo{
    font-size: 1.3em;
}
.title{
    text-align: center;
    margin-bottom: 4vh;
}
.amount{
    margin-top: 2vh;
}
.mainBlock{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.filter{
    width: 50%;
    max-width: 230px;
    height: 250px;
}
.defFilter{
    width: 100%;
    height: 100%;
     background: linear-gradient(45deg, rgba(14, 17, 24, 0.7) 0%, rgba(29, 32, 37, 0.7) 100%);
    padding: 0 5% 10% 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.items{
    width: 65%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
}
.difference{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
}
.difference input{
    width: 40%;
    background-color: transparent;
    outline: none;
    border: 1px solid grey;
    box-shadow: 0 0 2px rgb(179, 179, 179);
    border-radius: 1px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    text-align: center;
}
.success{
    width: 100%;
    text-align: center;
    border: 1px solid rgb(245, 132, 39);
    box-shadow: 0 0 2px rgb(245, 132, 39);
    border-radius: 1px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 3px;
    cursor: pointer;
}
.alphabet{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
}
.alphabet input{
    width: 40%;
    background-color: transparent;
    outline: none;
    border: 1px solid grey;
    box-shadow: 0 0 2px rgb(179, 179, 179);
    border-radius: 1px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    text-align: center;
}
.alphabet .button{
    width: 40%;
    text-align: center;
    border: 1px solid rgb(245, 132, 39);
    box-shadow: 0 0 2px rgb(245, 132, 39);
    border-radius: 1px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 3px;
    cursor: pointer;
}
.price{
    margin-top: 0;
    margin-bottom: 0;
}
.swiper-slide{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 250px;
    text-align: center;
    padding: 5%;
}
@media (max-width: 900px) {
  .mainBlock{
      flex-direction: column;
      align-items: center;
  }
  .items{
    margin-top: 30px;
    width: 100%;
  }
  .filter{
      width: 100%;
  }
  .defFilter{
      margin-left: -5%;
  }
}
</style>