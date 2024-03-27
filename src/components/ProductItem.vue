<!--Lab2新增-->
<!--商品列表父组件中的单个商品子组件-->
<script setup lang="ts">
defineProps(['pid', 'name', 'price', 'type', 'images'])
</script>

<template>
  <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <h3>{{ name}}</h3>
      </div>
    </template>
    <el-carousel height="200px" motion-blur indicator-position="outside">
      <el-carousel-item v-for="(image,index) in images" :key="index">
        <el-image :src="image"></el-image>
      </el-carousel-item>
    </el-carousel>
    <template #footer>
      <span class="price-size">¥{{ price }}</span>
    </template>
  </el-card>
</template>

<style scoped>
.price-size{
  font-size: 30px;
}
</style>
