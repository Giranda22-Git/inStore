<template>
  <div class="wrapper">
    <div class="front">
      <input v-model="name" type="text" placeholder="   Enter ProductName">
      <input v-model="description" type="text" placeholder="   Enter ProductDescription">
      <div class="category-bandle">
        <input v-model="category" type="text" placeholder="   Enter New Product Category">
        <select v-model="category" name="category" id="category"  placeholder="   Select Product Category">
          <option
            v-for="categoryInx in resDataCategory"
            :key="categoryInx"
            :value="categoryInx"
          >{{ categoryInx }}</option>
        </select>
      </div>
      <input v-model="price" type="number" placeholder="   Enter ProductPrice">
      <label for="file">{{ filename }}</label>
      <input style="display: none" id="file" type="file" name="files" @change="handleFileUpload()" ref="file" multiple>
      <input v-model="count" type="number" placeholder="   Enter ProductCount">
      <progress max="100" :value.prop="uploadPercentage"></progress>
      <button @click="sendFile()">Send</button>
      <img
        v-for="element in resData.images"
        :key="element.filename"
        :src="element.clientPath"
        alt="Loading...">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'test',
  data: () => ({
    name: null,
    description: null,
    category: null,
    price: null,
    images: null,
    filename: 'Выберите файл',
    count: null,
    uploadPercentage: 0,
    resData: {
      images: Array
    },
    resDataCategory: [],
    info: [
      {
        name: "Дисплей",
        infoItems: [
          {
            title: "Диагональ дисплея, дюйм",
            value: "14"
          },
          {
            title: "Серия процессора",
            value: "Athion Gold"
          },
          {
            title: "Модель процессора",
            value: "3150U"
          },
          {
            title: "Обьем оперативной памяти",
            value: "128 ГБ"
          }
        ]
      },
      {
        name: "Видео",
        infoItems: [
          {
            title: "Диагональ дисплея, дюйм",
            value: "14"
          },
          {
            title: "Серия процессора",
            value: "Athion Gold"
          }
        ]
      },
      {
        name: "Дисплей",
        infoItems: [
          {
            title: "Диагональ дисплея, дюйм",
            value: "14"
          },
          {
            title: "Серия процессора",
            value: "Athion Gold"
          },
          {
            title: "Модель процессора",
            value: "3150U"
          },
          {
            title: "Обьем оперативной памяти",
            value: "128 ГБ"
          }
        ]
      }
    ]
  }),
  async mounted () {
    await axios.get('http://localhost:3000/storage/categories')
      .then(response => {
        if (response.data !== null) {
          this.resDataCategory = response.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleFileUpload () {
      if (this.$refs.file.files.length === 0) this.images = null
      else {
        this.images = this.$refs.file.files
        this.filename = this.images[0].name
      }
    },
    async sendFile (res, rej) {
      console.log(Boolean(this.images))
      if (this.images) {
        const formData = new FormData()
        this.images.forEach(file => {
          formData.append('files', file)
        })
        formData.append('name', this.name)
        formData.append('description', this.description)
        formData.append('category', this.category)
        formData.append('price', this.price)
        formData.append('count', this.count)
        console.log(this.images)
        formData.append('info', JSON.stringify(this.info))
        await axios.post('http://localhost:3000/storage',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            }.bind(this)
          }
        )
          .then(response => {
            console.log(response.data !== null)
            if (response.data !== null) {
              this.resData = response.data
            }
          })
          .catch(err => {
            console.log(err)
          })
        this.images = null
        this.filename = 'Выберите файл'
        this.uploadPercentage = 0
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  *
    box-sizing: border-box
    outline: 1px solid red
    color: white
    & input, select, option
      background-color: black
  .wrapper
    width: 100vw
    height: 100vh
    display: flex
    justify-content: center
    align-items: center
    .front
      width: 70%
      height: 100%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .category-bandle
        width: 100%
        height: 50px
        display: flex
        justify-content: space-evenly
        align-items: center
        & input, select
          width: 30%
          height: 50%
</style>
