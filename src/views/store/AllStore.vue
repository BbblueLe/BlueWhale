<!--Lab2新增-全部商店界面/主页-->
<script setup lang="ts">
  import {reactive} from "vue";
  import {CirclePlus} from "@element-plus/icons-vue";
  import {type StoreDetails,getAllStores} from "../../api/store.ts"


  getStoreInfo()

  //创建商店详情信息数组
  let storeList = reactive<Array<StoreDetails>>([
      {storeId: 0, name: "样本商店", logoLink: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
  ])

  //获取所有商店信息
  function getStoreInfo() {
    getAllStores().then(res => {
      storeList = [...res.data]
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
        <router-link to="/storeDetail/:storeId" v-slot="{navigate}">
          <el-card @click="navigate" style="width: 400px; height: auto" shadow="hover">
            <el-image :src="store.logoLink" class="store-img"></el-image>
            <div>
              <br>
              <span class="store-name">{{store.name}}</span>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>

  </el-scrollbar>


</template>


<style scoped>
.header{
  margin: auto;
  text-align: center;
  font-size: 30px;
}
.store-img{
  width: 400px;
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

</style>
