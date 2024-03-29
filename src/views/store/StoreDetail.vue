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
import {router} from "../../router";
import CreateProduct from "../product/CreateProduct.vue";

const isCollapse = ref(true)


let logoLink = ref('')
let name = ref('')

const props = defineProps(['storeId'])

const dialogVisible = ref(false)

let productList = ref([
  {
    productId: 0,
    name: '麦辣鸡腿堡',
    price: 20,
    type: 'FOOD',
    productImages: [{productImagesId: 0, imageUrl: ''}]
  }
])
function jmp() {
  router.push('/productDetail/:productId')
}

getOneStoreInfo(props.storeId).then(res => {
  logoLink.value = res.data.result.logoLink
  name.value = res.data.result.name

})
getProductsInfo()
function getProductsInfo() {
  getAllProductsInStore(props.storeId).then(res => {

    productList.value = res.data.result
    console.log(res.data.result)
  })
}
function checkRole(){
  const role: string | null = sessionStorage.getItem('role')
  const sid : string | null = sessionStorage.getItem('storeId')
  console.log(role, sid, props.storeId)
  if(role && sid){
    if(role === 'STAFF' && sid === props.storeId) {
      dialogVisible.value = true
    } else {
      ElMessage({
        message: '您没有该权限！',
        type: 'error',
        center: true,
      })
    }
  }
}
</script>


<template>
  <el-icon @click="checkRole" class="add-button" :size="45" color="white"><CirclePlus /></el-icon>
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
    <ProductItem @click="jmp"
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
