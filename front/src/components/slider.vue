<template>
  <div class="CatSlid">
    <div class="categories">
      <svg @click='up' class = 'firstSvg' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 443.52 443.52" style="transform: rotate(90deg); enable-background:new 0 0 443.52 443.52;" xml:space="preserve"><g><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8 c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712 L143.492,221.863z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
      <div class = 'slider' style = 'width: 100%; height: 74%; margin: 13% 0 13% 0'><h4 style="margin-left: 50px" @click="$emit('myEvent', el)" v-for="(el, i) in Filters" :key="i">{{el}}</h4></div>
      <svg @click='down' class = 'lastSvg' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 443.52 443.52" style="transform: rotate(-90deg); enable-background:new 0 0 443.52 443.52;" xml:space="preserve"><g><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8 c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712 L143.492,221.863z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
    </div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(el,i) in Products" :key='i'>
             <RouterLink :to=" `product/${el._id}`">
               <img :src='el.images[Math.floor(Math.random() * el.images.length)].clientPath' alt="">
             </RouterLink>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from '../assets/swiper/bundle';
import '../assets/swiper/swiper-bundle.css'
import axios from 'axios'
export default {
    name: 'Home',
    data(){
      return{
        Filters: [],
        Products: []
      }
    },
    mounted () {
      this.GetFilters()

      this.getSliders()
    },
    methods:{
      up(){
        document.querySelector('.slider').scrollTo({
          top: document.querySelector('.slider').scrollTop - 43,
          behavior: 'smooth'
        });
      },
      down(){
        document.querySelector('.slider').scrollTo({
          top: document.querySelector('.slider').scrollTop + 43,
          behavior: 'smooth'
        });
      },
      async getSliders(){
        var self = this
        axios.get(`${this.$store.state.BackEndUrl}/storage`)
        .then(response => {
          if (response.data !== null) {
            // Shuffle array
            const shuffled = response.data.sort(() => 0.5 - Math.random());

            // Get sub-array of first 7 elements after shuffled
            let selected = shuffled.slice(0, 7);
            this.Products = selected
          }
        })
        .catch(err => {
          console.log(err)
        })
        .then(function () {
            self.SwiperActivation()
        });
      },
      SwiperActivation(){
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
      },
      async GetFilters(){
        await axios.get(`${this.$store.state.BackEndUrl}/storage/categories`)
        .then(response => {
          if (response.data !== null) {
            console.log(response.data);
            this.Filters = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
    
}
</script>

<style scoped>
svg{
  width: 30px;
  height: 30px;
  margin-left: -15px;
}
.lastSvg{
  position: absolute;
  fill: rgb(235, 120, 13);
  bottom: 0;
  left: 50%;
}
.firstSvg{
  position: absolute;
  fill: rgb(235, 120, 13);
  top: 0;
  left: 50%;
}
.CatSlid{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.categories{
  width: 280px;
  height: 400px;
  background: linear-gradient(45deg, rgba(14, 17, 24, 0.7) 0%, rgba(29, 32, 37, 0.7) 100%);
  cursor: pointer;
  font-size: 1.1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.slider{
  overflow-y:hidden
}
/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.swiper-container-horizontal > .swiper-pagination-bullets{
  bottom: 60px;
  left: 0;
  width: 100%;
}
.home{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.size {
  border: 1px solid #000;
  padding: 5px 40px 5px 5px;
  height: 20px;
  width: 40vw;
  background: url('../assets/logo.png') no-repeat 100%;
  background-size: auto 90%;
  border: 1px solid #d14711;
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(231, 161, 120, 0.5); /* Параметры тени */
}
.swiper-container {
    width: 53vw;
    margin: 0;
    margin-left: 30px;
    padding: 0;
    padding-top: 50px;
    padding-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
    width: 53vw;
    height: 27vw;
    max-height: 600px;
    background: #000;
}
.swiper-slide img{
    width: 56vw;
    object-fit: cover;
    height: 27vw;
    max-height: 600px;
}
@media (max-width: 1200px) {
  .swiper-container{
    width: 600px;
  }
  .swiper-slide{
    height: 380px;
  }
  .CatSlid{
      flex-direction: row;
  }
  .swiper-slide img{
      width: 600px;
      object-fit: cover;
      height: 380px;   
  }
}
@media (max-width: 1100px) {
  .swiper-container{
    margin-left: 0;
  }
  .CatSlid{
    flex-direction: column;
  }
  .categories{
    margin-top: 30px;
  }
}
@media (max-width: 700px) {
  .swiper-container {
      width: 450px;
  }
  .swiper-slide {
      width: 450px;
      height: 300px;
  }
  .swiper-slide img{
      width: 450px;   
      height: 300px;
  }
  .categories{
    width: 250px;
    height: 340px;
  }
}
@media (max-width: 500px) {
  .swiper-container {
      width: 300px;
  }
  .swiper-slide {
      width: 300px;
      height: 210px;
  }
  .swiper-slide img{
      width: 300px;   
      height: 210px;
  }
}
</style>