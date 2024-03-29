<script setup lang="ts">

import { router } from "../../../router";
import { ref } from 'vue';
const quantity = ref(0);

</script>

<template>
  <el-main>
    <el-form class="update-inventory-form" label-width="120px">
      <el-form-item label="商品库存">
        <el-input v-model.number="quantity" placeholder="请输入库存数量"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updateInventory">确定</el-button>
        <el-button @click="cancel">取消</el-button>
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