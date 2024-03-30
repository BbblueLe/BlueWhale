<script setup lang="ts">

import { ref } from 'vue';
import {updateProductInfo} from "../../../api/product.ts";

const props = defineProps(['productId'])
const quantity = ref(0);


function update() {
  updateProductInfo({
    productId: parseInt(props.productId),
    inventory: quantity.value
  }).then(res => {
    if(res.data.code === '000') {
      ElMessage({
        message: "更新成功！",
        type: 'success',
        center: true
      })
    } else if(res.data.code === '400'){
      ElMessage({
        message: '更新失败',
        type: 'error',
        center: true,
      })
    }
  })
}

</script>

<template>
  <el-main>
    <el-form class="update-inventory-form" label-width="120px">
      <el-form-item label="商品库存">
        <el-input v-model="quantity"  placeholder="请输入库存数量" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="update()">更新</el-button>
      </el-form-item>
    </el-form>
  </el-main>a
</template>


<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让容器充满整个视口高度 */
}

.button-group {
  display: flex;
  justify-content: center;
}

</style>