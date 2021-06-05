<template>
  <div class="home">
      <div class="size" id = 'box'>
        <input id = 'input' type="text" autocomplete="off" placeholder="Я хочу найти...">
      </div>
      <Slider @myEvent="sliderCat" v-if='!IsFound' />
      <FoundProducts v-if='IsFound' :items='ArrayItems' :name='SearchName' :type="type" :category='category' />
      <hr style = "width: 70vw"/>
      <div class="BigTitle">Популярные товары</div>
      <PopProd />
      <div class="BigTitle">Сейчас покупают</div>
      <PopProd2 />
      <hr style = "width: 70vw"/>
      <div class="BigTitle">Интернет магазин</div>
      <About />
      <hr style = "width: 70vw"/>
      <div class="BigTitle">Наши контакты</div>
      <Contact />
  </div>
</template>

<script>
import PopProd from '../components/popprod.vue'
import PopProd2 from '../components/popprod2.vue'
import Slider from '../components/slider.vue'
import Reclama from '../components/reclama.vue'
import About from '../components/about.vue'
import Contact from '../components/contact.vue'
import FoundProducts from '../components/foundProducts.vue'
import axios from 'axios'
export default {
    name: 'Home',
    components:{
      PopProd,
      Slider,
      Reclama,
      About,
      Contact,
      FoundProducts,
      PopProd2
    },
    data(){
      return {
        ArrayItems: [],
        IsFound: false,
        SearchName: '',
        type: 'search',
        category: ''
      }
    },
    mounted(){
      var input = document.querySelector('.size');
      input.addEventListener('click', e => {
        if(e.target.id == 'box'){
          this.getItemsInformation()
        }
      })

      document.querySelector('.home').addEventListener('keydown', event => {
        if (event.code == 'Enter' && document.getElementById('input').value != '') {
          this.getItemsInformation()
        }
      });
    },
    methods:{
      async sliderCat(Innerfilter){
        await axios.post('http://localhost:3000/storage/search', {
          filter: Innerfilter
        })
        .then(response => {
          if (response.data !== null) {
            console.log(response.data);
            this.ArrayItems = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
        this.type = 'category'
        this.category = Innerfilter
        this.IsFound = true
      },
      async getItemsInformation(){
        this.SearchName = document.getElementById('input').value
        await axios.post('http://localhost:3000/storage/search', {
          query: this.SearchName
        })
        .then(response => {
          if (response.data !== null) {
            console.log(response.data);
            this.ArrayItems = response.data
          }
        })
        .catch(err => {
          console.log(err)
        })
        this.IsFound = true
        this.type = 'search'
        this.category = ''
      }
    }
}
</script>

<style scoped>
input{
  background-color: transparent;
  outline: none;
  border: none;
  height: 100%;
  width: calc(100% - 35px);
  line-height: 100%;
  font-size: 1em;
}
.home{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.size {
  height: 25px;
  width: 40vw;
  background: url('../assets/search.png') no-repeat 100%;
  background-size: auto 90%;
  border: 1px solid #d14711;
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(231, 161, 120, 0.5); /* Параметры тени */
  cursor: pointer;
}
.BigTitle{
  font-size: 1.5em;
}
</style>