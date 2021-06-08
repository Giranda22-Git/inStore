<template>
  <div id="app2">
    <MyHeader />
    <hr style = "width: 70vw"/>
    <div class="app3">
      <router-view/>
    </div>
    <MyFooter />
  </div>
</template>

<style>
*{
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
body{
  user-select: none;
  margin: 0;
  padding: 0;
}
.app3{
  min-height: 100vh;
  width: 88vw;
  padding: 1vh 6vw 1vh 6vw;
  margin: 0;
  overflow: hidden;
}
#app2{
  background: url('./assets/Fon.jpg');
  background-size: cover;
  overflow: hidden;
}
</style>

<script>
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
export default {
  components:{
    MyHeader,
    MyFooter
  }
}
</script>