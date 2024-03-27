<!--Lab2新增-全部商店界面/主页-->
<script setup lang="ts">
import {ref} from "vue";
  import {CirclePlus} from "@element-plus/icons-vue";
  import {getAllStores} from "../../api/store.ts"
  import StoreItem from "../../components/StoreItem.vue";


getStoreInfo()


  //创建商店详情信息数组
  let storeList = ref([
      {storeId: 0, name:'', logoLink:''}
  ])

  //获取所有商店信息
  function getStoreInfo() {

    getAllStores().then(res => {
      storeList.value = res.data.result
      console.log(storeList)
    })
  }

</script>


<template>
  <router-link to="/createStore" v-slot="{navigate}">
    <el-icon @click="navigate" class="add-button" :size="45" color="white"><CirclePlus /></el-icon>
  </router-link>
  <el-scrollbar height="100%">
    <el-row>
      <el-col :span="4" v-for="store in storeList" :key="store.storeId" :offset="1">
        <router-link :to="`/storeDetail/${store.storeId}`" v-slot="{navigate}">
          <StoreItem @click="navigate" :store="store"></StoreItem>
        </router-link>
      </el-col>
    </el-row>

  </el-scrollbar>


</template>


<style scoped>
.store-img{
  width: 400px;
  height: 400px;
  overflow-y: auto;
}
.add-button{
  position: absolute;
  width: 300rpx;
  top: 7px;
  right: 14%;
}
.store-name{
  font-size: 20px;
}
.store-cards{
  position: relative;

}
</style>
