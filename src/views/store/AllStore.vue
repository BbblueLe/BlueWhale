<!--Lab2新增-全部商店界面/主页-->
<script setup lang="ts">
import {ref} from "vue";
import {CirclePlus} from "@element-plus/icons-vue";
import {getAllStores} from "../../api/store.ts"
import StoreItem from "../../components/StoreItem.vue";
import CreateStore from "./components/CreateStore.vue";

getStoreInfo()

const dialogVisible = ref(false)
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
  function checkRole(){
    const role: string | null = sessionStorage.getItem('role')
    if(role){
      if(role === 'MANAGER') {
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

  <el-dialog v-model="dialogVisible" title="创建商店" width="800" draggable overflow>
    <CreateStore></CreateStore>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false; getStoreInfo()">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false; getStoreInfo()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-scrollbar height="100%">
    <el-row>
      <el-col :span="5" v-for="store in storeList" :key="store.storeId" :offset="1" class="store-col">
        <router-link :to="`/storeDetail/${store.storeId}`" v-slot="{navigate}" class="no-link" >
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
.no-link {
  text-decoration: none;
}
.store-name{
  font-size: 20px;
}
.store-cards{
  position: relative;

}
.store-col{
  margin: 25px;
}
</style>
