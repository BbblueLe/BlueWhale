<!--Lab2新增-商店详情界面-->
<script setup lang="ts">
import {getAllProductsInStore, getOneStoreInfo} from "../../api/store.ts";
import {ref} from 'vue'

import ProductItem from "../../components/ProductItem.vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, CirclePlus,
} from '@element-plus/icons-vue'
import CreateProduct from "../product/CreateProduct.vue";

//导航栏组件变量
const isCollapse = ref(true)
//弹窗组件变量
const dialogVisible = ref(false)

//商店logo
const logoLink = ref('')
//商店名
const name = ref('')

//从所有商店界面跳转时地址中传递的storeId
const props = defineProps(['storeId'])

//商品列表数组
let productList = ref([
  {
    productId: 0,
    name: '麦辣鸡腿堡',
    price: 20,
    type: 'FOOD',
    productImages: [{productImagesId: 0, imageUrl: ''}]
  }
])

//获取商店logo和商店名信息
getOneStoreInfo(props.storeId).then(res => {
  logoLink.value = res.data.result.logoLink
  name.value = res.data.result.name

})
//调用方法获取商品信息
getProductsInfo()

//获取所有商品信息
function getProductsInfo() {
  getAllProductsInStore(props.storeId).then(res => {

    productList.value = res.data.result
    console.log(res.data.result)
  })
}

//身份验证，当且仅当身份为STAFF且对应storeId即注册时为所属商店时，可以创建商品
//创建商品弹窗v-show="checkRole()"
function checkRole(){
  const role: string | null = sessionStorage.getItem('role')
  const sid : string | null = sessionStorage.getItem('storeId')
  console.log(role, sid, props.storeId)
  if(role && sid){
    if(role === 'STAFF' && sid === props.storeId) {
      return true
    }
  }
  return false
}
</script>


<template>
  <el-icon @click="dialogVisible=true" class="add-button" :size="45" color="white" v-show="checkRole()"><CirclePlus /></el-icon>
  <el-dialog v-model="dialogVisible" title="创建商品" width="900" draggable overflow>
    <CreateProduct :storeId="props.storeId"></CreateProduct>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false;getProductsInfo()">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false; getProductsInfo()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-container>
    <!--希望把商店详情的一部分内容放在这个侧边栏里，你要真不想放也没事-->
    <el-aside width="25%" class="page-aside">
      <el-image :src="logoLink" class="store-img"></el-image>
      <h2>{{name}}</h2>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false" :value="false">expand</el-radio-button>
        <el-radio-button :label="true" :value="true">collapse</el-radio-button>
      </el-radio-group>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
     <el-row>
       <el-col :span="10" v-for="product in productList" :key="product.productId">
         <ProductItem
                 :pid="product.productId"
                 :name="product.name"
                 :price="product.price"
                 :type="product.type"
                 :images="product.productImages"
        ></ProductItem>
       </el-col>
     </el-row>
    </el-main>
  </el-container>
</template>


<style scoped>
.page-aside {
  border-right: lightgrey solid 1px;
}
.store-img{
  width: 100%;
  height: 500px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.add-button{
  position: absolute;
  width: 300rpx;
  top: 7px;
  right: 14%;
}
</style>
