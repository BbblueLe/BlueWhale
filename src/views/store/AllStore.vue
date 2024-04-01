<!--Lab2新增-全部商店界面/主页-->
<script setup lang="ts">
import {ref} from "vue";
import {CirclePlus} from "@element-plus/icons-vue";
import {getAllStores} from "../../api/store.ts"
import StoreItem from "../../components/StoreItem.vue";
import CreateStore from "./components/CreateStore.vue";

  //调用方法获取商店信息
  getStoreInfo()

  const dialogVisible = ref(false)
  //创建商店详情信息数组
  const storeList = ref([
      {storeId: 0, name:'', logoLink:''}
  ])

  //获取所有商店信息
  function getStoreInfo() {

    getAllStores().then(res => {
      storeList.value = res.data.result
      console.log(storeList)
    })
  }

  //查询身份信息，如果是管理员则返回true，反之false
  //在创建商店的按钮中添加v-show="checkRole()"，仅有管理员可见该弹窗按钮
  function checkRole(){
    const role: string | null = sessionStorage.getItem('role')
    if(role){
      if(role === 'MANAGER') {
        return true
      }
    }
    return false
  }


</script>


<template>
    <el-icon @click="dialogVisible=true" class="add-button" :size="45" color="white" v-show="checkRole()"><CirclePlus /></el-icon>

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

.add-button{
  position: absolute;
  width: 300rpx;
  top: 7px;
  right: 14%;
}
.no-link {
  text-decoration: none;
}
.store-col{
  margin: 25px;
}
</style>
