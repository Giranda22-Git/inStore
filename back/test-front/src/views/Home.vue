<template>
  <div class="home">
    <NewProductTest />
  </div>
</template>

<script>
// @ is an alias to /src
import NewProductTest from '@/components/NewProductTest.vue'

export default {
  name: 'Home',
  components: {
    NewProductTest
  }
}
</script>
