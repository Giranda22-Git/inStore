<template>
    <div class="swiper-container2 mySwiper2">
      <div class="swiper-wrapper">
        <div v-for="(el, i) in Products" :key='i' class="swiper-slide" style="width: 200px; height: 200px">
            <RouterLink :to=" `product/${el._id}`"><img :src='el.images[Math.floor(Math.random() * el.images.length)].clientPath' alt=""></RouterLink>
            <div style="width: 80%; margin: 5px 0 5px 0">{{el.name}}</div>
             <RouterLink :to=" `product/${el._id}`"><div class="price2">{{el.price}} тг.</div></RouterLink>
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import Swiper from '../assets/swiper/bundle';
import '../assets/swiper/swiper-bundle.css'
import axios from 'axios'
export default {
    data(){
        return{
            Products: []
        }
    },
    mounted(){
        var self = this
        axios.get('http://localhost:3000/storage')
        .then(response => {
          if (response.data !== null) {
            console.log(response.data);
            // Shuffle array
            const shuffled = response.data.sort(() => 0.5 - Math.random());

            // Get sub-array of first 7 elements after shuffled
            let selected = shuffled.slice(0, 7);
            this.Products = selected
            console.log(this.Products);
          }
        })
        .catch(err => {
          console.log(err)
        })
        .then(function () {
            self.swiperInit()
        });
        this.IsFound = true
        this.type = 'search'
        this.category = ''
    },
    methods:{
        swiperInit(){
            var swiper = new Swiper(".mySwiper2", {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 10,
                initialSlide: 2,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
        });
        }
    }
}
</script>

<style scoped>
    a{
        width: 70%;
        height: 70%;
        text-align: center;
        text-decoration: none;
    }
    .price2{
        padding: 4px 15% 4px 15%;
        border: 1px solid rgb(202, 121, 0);
        border-radius: 10px;
        cursor: pointer;
        width: 70%;
    }

    .swiper-slide {
        max-width: 400px !important;
        
        text-align: center;
        font-size: 18px;
        background: transparent;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        flex-direction: column;
    }

    .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .swiper-container2 {
        width: 100%;
        height: 300px;
        margin: 20px auto;
        max-width: 400px;
    }
</style>