<template>
    <div class="ROOT" v-if="allowed">
        <vue-tabs>
            <v-tab title="Adding products">
                <div class="front">
                    <input v-model="name" type="text" placeholder=" Product Name">
                    <textarea v-model="description" type="text" placeholder=" Product Description" />
                    <div class="category-bandle">
                        <input v-model="category" type="text" placeholder=" Product Category">
                        <select v-model="category" name="category" id="category"  placeholder="   Select Product Category">
                        <option
                            v-for="categoryInx in resDataCategory"
                            :key="categoryInx"
                            :value="categoryInx"
                        >{{ categoryInx }}</option>
                        </select>
                    </div>
                    <input v-model="price" type="number" placeholder=" Product Price">
                    <label for="file">{{ filename }}</label>
                    <input style="display: none" id="file" type="file" name="files" @change="handleFileUpload()" ref="file" multiple>
                    <input v-model="count" type="number" placeholder=" Product Count">
                    <div class='settings'>
                        <div v-for="(el,i) in Settings" :key='i'>
                            <input v-model='el[0]' class = 'SettingNameIput' type="text" placeholder="Setting name" id="">
                            <div v-if="Settings[i].length > 1">
                                <div class = 'inputs' v-for="(option,o) in el[1]" :key='o'>
                                    <input v-model='option[0]' type="text" placeholder="Option title">
                                    <input v-model='option[1]' type="text" placeholder="Option value">
                                </div>
                            </div>
                            <button style = "margin-bottom: 50px; margin-top: 10px" @click='el[1].push([,])'>Add option</button>
                        </div>
                    </div>
                    <button @click='Settings.push(["", []])'>Add setting</button>
                    <button @click="sendFile()">Send</button>
                    <img
                        v-for="element in resData.images"
                        :key="element.filename"
                        :src="element.clientPath"
                        alt="Loading...">
                </div>
            </v-tab>

            <v-tab title="Changing and removing">
                <div class="items">
                    <div v-for="(i, el) in Products" :key='el' style = "display: flex; align-items: center; justify-content: center">
                        <div class="swiper-slide3" >
                            <RouterLink :to=" `product/${i._id}`"><img :src='i.images[0].clientPath' alt=""></RouterLink>
                            <div style="width: 80%; margin-top: 6px; margin-bottom: 6px">{{i.name}}</div>
                            <RouterLink :to=" `product/${i._id}`"><div class="price2">{{i.price}} тг.</div></RouterLink>
                        </div>
                        <div style = "display: flex; align-items: center; justify-content: center; flex-direction: column">
                            <div class="buttonDelete" @click="deleteItem(i._id)">Delete</div>
                            <div class="buttonChange" @click="ChangeItemOption(i._id)">Change Option</div>
                        </div>
                    </div>

                </div>
            </v-tab>
            <v-tab class = 'flex' title="Product changing" v-if="ItemChanging">
                <input v-model="Product.name" type="text" placeholder=" Product Name">
                <textarea v-model="Product.description" type="text" placeholder=" Product Description"></textarea>
                <div class="category-bandle">
                    <input v-model="Product.category" type="text" placeholder=" Product Category">
                    <select v-model="Product.category" name="category" id="category"  placeholder="   Select Product Category">
                    <option
                        v-for="categoryInx in resDataCategory"
                        :key="categoryInx"
                        :value="categoryInx"
                    >{{ categoryInx }}</option>
                    </select>
                </div>
                <input v-model="Product.price" type="number" placeholder=" Product Price">
                <input v-model="Product.count" type="number" placeholder=" Product Count">
                <hr style = "width: 60vw">
                <div class='settings'>
                    <div class = 'settings' v-if='Product.info[0][0]'>
                        <div v-for="(el,i) in Product.info" :key='i'>
                            <input v-model='el[0]' class = 'SettingNameIput' type="text" placeholder="Setting name" id="">
                            <div v-if="Product.info[i].length > 1">
                                <div class = 'inputs' v-for="(option,o) in el[1]" :key='o'>
                                    <input v-model='option[0]' type="text" placeholder="Option title">
                                    <input v-model='option[1]' type="text" placeholder="Option value">
                                </div>
                            </div>
                            <button style = "display: block; margin-bottom: 50px; margin-top: 10px" @click='el[1].push([,])'>Add option</button>
                        </div>
                        <button style = "margin-bottom: 10px" @click='Product.info.push(["", []])'>Add setting</button>
                        <button @click="updateProduct(Product._id)">Update Product</button>
                    </div>
                    <div class = 'settings' v-else-if='Product.info[0].infoItems'>
                        <div v-for="(el,i) in Product.info" :key='i'>
                            <input v-model='el.name' class = 'SettingNameIput' type="text" placeholder="Setting name" id="">
                            <div class = 'inputs' v-for="(option,o) in el.infoItems" :key='o'>
                                <input v-model='option.title' type="text" placeholder="Option title">
                                <input v-model='option.value' type="text" placeholder="Option value">
                            </div>
                            <button style = "display: block; margin-bottom: 50px; margin-top: 10px" @click='el.infoItems.push({"title": "", "value": ""})'>Add option</button>
                        </div>
                        <button style = "margin-bottom: 10px" @click='Product.info.push({"name": "", "infoItems": []})'>Add setting</button>
                        <button @click="updateProduct(Product._id)">Update Product</button>
                    </div>
                </div>
            </v-tab>
        </vue-tabs>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    data: () => ({
        allowed: false,
        name: null,
        description: null,
        category: null,
        price: null,
        images: null,
        filename: 'Выберите файл',
        count: null,
        resData: {
        images: Array
        },
        resDataCategory: [],
        Products: [],
        Settings: [],
        ItemChanging: false,
        Product: null
    }),
    async mounted(){
        var self = this
        await axios.get('http://localhost:3000/storage/categories')
        .then(response => {
            if (response.data !== null) {
            self.resDataCategory = response.data
            }
        })
        .catch(err => {
            console.log(err)
        })
        this.SwalActivate()
        this.getProducts()
    },
    methods: {
        async updateProduct(Id){
            console.log(this.Product);
            await axios.put('http://localhost:3000/storage',
            {
                "id": Id,
                "update": this.Product
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err)
            })
        },
        ChangeItemOption(Id){
            var self = this
            axios.get(`http://localhost:3000/storage/findById/${Id}`)
            .then(response => {
                if (response.data !== null) {
                    self.Product = response.data;
                    console.log(self.Product, 's');
                    self.ItemChanging = true
                }
            })
            .catch(err => {
            console.log(err)
            })
        },
        async deleteItem(Itemid){
            var self = this
            axios.delete("http://localhost:3000/storage/delete/id", 
            { 
              data: 
                { 
                  id: Itemid 
                }
            })
            .then(response => {
                if (response.data !== null) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Product has been deleted!'
                    })
                    setTimeout(() => {
                        self.getProducts()
                    }, 1000);
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        async getProducts(){
            await axios.get('http://localhost:3000/storage')
            .then(response => {
            if (response.data !== null) {
                this.Products = response.data
            }
            })
            .catch(err => {
            console.log(err)
            })
        },
        handleFileUpload () {
            if (this.$refs.file.files.length === 0) this.images = null
            else {
                this.images = this.$refs.file.files
                this.filename = this.images[0].name
            }
        },
        async sendFile (res, rej) {
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
                console.log(JSON.stringify(this.Settings), 'a');
                formData.append('info', JSON.stringify(this.Settings))
                await axios.post('http://localhost:3000/storage', formData,
                {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    if (response.data !== null) {
                    this.resData = response.data
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Product has been created!'
                    })
                    this.getProducts()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                this.images = null
                this.filename = 'Выберите файл'
                this.uploadPercentage = 0
            }
        },
        SwalActivate(){
            var self = this
            Swal.fire({
                title: 'Your password:',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Look up',
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                    axios.post(`http://localhost:3000/admin/authorization`,{
                        Login: 'admin',
                        Password: login
                    })
                    .then(response => {
                        if(response.data.result == true) self.allowed = true
                        console.log(response);
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
            })
        }
    }
}
</script>
<style>
a{
    width: 100%;
    height: 100%;
    text-decoration: none;
}
.swal2-input{
    color: black !important;
}
.vue-tabs .nav-tabs > li.active > a, .vue-tabs .nav-tabs > li.active > a:hover, .vue-tabs .nav-tabs > li.active > a:focus{
    background-color: transparent !important;
}
.vue-tabs .nav > li > a:hover, .vue-tabs .nav > li > a:focus {
    background-color: #6e6e6e !important;
}
.active_tab, .tabs__link{
    width: auto !important;
}
</style>
<style scoped>
.front{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.front > * {
    margin: 20px 0 20px 0;
}
input, option, button, select, textarea{
    color: white;
    outline: none;
    border: 1px solid orange;
    height: 2em;
    font-size: 0.9em;
    letter-spacing: 1px;
    background-color: #2b4363
}
textarea{
    height: 170px;
    width: 300px;
    font-size: 1.2em;
}
select{
    margin-left: 10px;
}
input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.items{
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 50px 0 0 0;
}
.swiper-slide3{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 230px;
    height: 230px;
    text-align: center;
    padding: 30px;
    box-sizing: border-box;
    margin: 100px 10px 50px 0;
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
.swiper-slide3 img {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 500px;
    object-fit: cover;
}
.buttonDelete{
    padding: 8px 15px 8px 15px;
    background-color: red;
    font-size: 0.9em;
    border-radius: 5px;
    text-align: center;
}
.buttonChange{
    padding: 8px 15px 8px 15px;
    background-color: rgb(223, 158, 39);
    font-size: 0.9em;
    border-radius: 5px;
    margin-top: 20px;
    text-align: center;
}
.settings{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.inputs{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flex{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.flex > *{
    margin: 10px;
}
</style>

