<template>
    <div class="Product">
      <div class="ITEMS">
        <div class="ITEM">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(el,i) in Product.images" :key='i'><img :src='el.clientPath' alt=""></div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="ITEM">
            <div class="ProdName">{{Product.description}}</div>
            <div class="price">{{Product.price}} тг.</div>
            <div class="title">Описание</div>
            <div>
                <div class="item">
                    <div class = "tit">Название: </div>
                    <div class = "val">{{Product.name}}</div>
                </div>
                <hr>
            </div>
            <div>
                <div class="item">
                    <div class = "tit">Категория: </div>
                    <div class = "val">{{Product.category}}</div>
                </div>
                <hr>
            </div>
            <div>
                <div class="item">
                    <div class = "tit">Количество: </div>
                    <div class = "val">{{Product.count}}</div>
                </div>
                <hr>
            </div>
            <div>
                <div class="item">
                    <div class = "tit">Цена: </div>
                    <div class = "val">{{Product.price}} тг.</div>
                </div>
                <hr>
            </div>
        </div>
        <div class="ITEM" v-for="(el,i) in Product.info" :key="i">
            <div class="title" v-if='el.name' >{{el.name}}</div>
            <div class="title" v-else >{{el[0]}}</div>
            <div v-if='el.infoItems'>
                <div v-for="(infoItem,o) in el.infoItems" :key="o">
                    <div class="item">
                        <div class = "tit">{{infoItem.title}}: </div>
                        <div class = "val">{{infoItem.value}}</div>
                    </div>
                    <hr>
                </div>
            </div>
            <div v-else>
                <div v-for="(infoItem,o) in el[1]" :key="o">
                    <div class="item">
                        <div class = "tit">{{infoItem[0]}}: </div>
                        <div class = "val">{{infoItem[1]}}</div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
      </div>
      <div class="BigTitle">Похожие товары</div>
      <PopProd />
    </div>
</template>

<script>
import Swiper from '../assets/swiper/bundle';
import '../assets/swiper/swiper-bundle.css'
import PopProd from '../components/popprod.vue'
import axios from 'axios'
export default {
    name: 'Home',
    components:{
      PopProd
    },
    data(){
        return{
            Product: {}
        }
    },
    created(){
        var self = this
        axios.get(`${self.$store.state.BackEndUrl}/storage/findById/${this.$route.params.id}`)
        .then(response => {
          if (response.data !== null) {
            self.Product = response.data;
            console.log(self.Product, 's');
          }
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
            self.swiperActivation()
        })
    },
    methods:{
        swiperActivation(){
            var swiper = new Swiper('.swiper-container', {
                loop: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        }
    }
}
</script>

<style scoped>
hr{
    width: 400px;
}
.Product{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.BigTitle{
  font-size: 1.5em;
}
img{
    object-fit: cover;
}
.ITEMS{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
.ITEM{
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 30px;
}
.title{
    font-size: 1.2em;
    margin-bottom: 10px;;
}
.item{
    width: 100%;
    display: flex;
    flex-direction: row;
}
.tit{
    text-align: left;
}
.val{
    margin-left: auto;
}
.price{
    margin: 20px 0 20px 0;
    font-size: 1.4em;
}
@media (max-width: 400px) {
    hr{
        width: 300px;
    }
    .ITEM{
        width: 300px;
    }
}
.swiper-container {
    width: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
    margin-right: 20%;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
    width: 400px;
    height: 280px;
    background: #000;
}
.swiper-slide img{
    width: 400px;
    height: 280px;       
}
@media (max-width: 1300px) {
  .CatSlid{
      flex-direction: column;
  }
  .categories{
    margin-left: 1px;
    margin-top: 30px;
  }
}
@media (max-width: 650px) {
  .swiper-container {
      width: 300px;
      margin-right: calc(50% - 150px);  
  }
  .swiper-slide {
      width: 300px;
      height: 230px;
  }
  .swiper-slide img{
      width: 300px;   
      height: 230px;
  }
}
</style>