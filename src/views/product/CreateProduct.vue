<!--Lab2新增-创建商品界面-->


<script setup lang="ts">
import {reactive, ref} from 'vue'
import {uploadImage} from '../../api/tools.ts'
import {Plus} from "@element-plus/icons-vue";
import {createProduct} from "../../api/product.ts";
import {getOneStoreInfo} from "../../api/store.ts";
//这边是需要实现上传至少2张图片。可以从CreateStore里提供的代码改，也可以自己搜了写。


const props = defineProps(['storeId'])
const newProduct = reactive({
  name: '',
  price: 0,
  type: '',
  description: ''
})
const imageFileList = ref([])
const logoUrl = ref([{imageUrl: ''}])
logoUrl.value.pop()
let storeName = ref('')
let storeUrl = ref('')

//获取商店信息用于POST数据到数据库
getOneStoreInfo(props.storeId).then(res => {
  storeName = res.data.result.name
  storeUrl = res.data.result.logoLink
})


function handleChange(file: any, fileList: any) {
  imageFileList.value = fileList
  let formData = new FormData()
  formData.append('file', file.raw)
  uploadImage(formData).then(res => {
    logoUrl.value.push({imageUrl:res.data.result})
    console.log(res.data)
  })
}

function uploadHttpRequest() {
  return new XMLHttpRequest()
}

//创建商品
function createNewProduct() {
  createProduct({
    name: newProduct.name,
    price: newProduct.price,
    type: newProduct.type,
    productImages: logoUrl.value,
    inventory: 10,
    description: newProduct.description,
    store: {storeId: props.storeId, name: storeName.value, logoLink: storeUrl.value}
  }).then(res => {
    if(res.data.code == '000') {
      ElMessage({
        message: "创建成功！",
        type: 'success',
        center: true
      })
    }else if(res.data.code === '400') {
      ElMessage({
        message: res.data.msg,
        type: 'error',
        center: true,
      })
    }
  })
  newProduct.name = ''
  newProduct.price = 0
  newProduct.type = ''
  newProduct.description = ''
  imageFileList.value = []
  logoUrl.value = []
}
</script>


<template>
  <el-main>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="商品名字" >
        <el-input v-model="newProduct.name" placeholder="Product Name" clearable/>
      </el-form-item>
      <el-form-item label="价格 (1~99999之间的正整数)">
        <el-input-number v-model="newProduct.price" :min ="1" :max="99999" @change="handleChange"/>
      </el-form-item>
      <el-form-item label="商品类型" >
        <el-select
            v-model="newProduct.type"
            placeholder="Choose Type"
            clearable
        >
          <el-option label="FOOD" value="FOOD" />
          <el-option label="CLOTHES" value="CLOTHES" />
          <el-option label="ELECTRONICS" value="ELECTRONICS" />
          <el-option label="ENTERTAINMENT" value="ENTERTAINMENT" />
          <el-option label="SPORTS" value="SPORTS" />
          <el-option label="LUXURY" value="LUXURY" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品描述" >
        <el-input v-model="newProduct.description" placeholder="Product Description" clearable/>
      </el-form-item>
      <br>
      <el-form-item label="商品图片">
        <el-upload
            v-model:file-list="imageFileList"
            :on-change="handleChange"
            :on-remove="handleChange"
            class="upload-demo"
            list-type="picture-card"
            :http-request="uploadHttpRequest"
            >
          <el-icon size="50px" ><Plus /></el-icon>

        </el-upload>
      </el-form-item>

    </el-form>
    <el-button type="primary" @click="createNewProduct">Create</el-button>
  </el-main>
</template>


<style scoped>
.upload-demo{
  width: 400px;
}
.demo-form-inline .el-input {
  --el-input-width: 500px;
}
.demo-form-inline .el-select {
  --el-select-width: 500px;
}
</style>
