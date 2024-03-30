<!--Lab2新增-->
<!--商品列表父组件中的单个商品子组件-->
<script setup lang="ts">
defineProps(['pid', 'name', 'price', 'type', 'images'])
</script>

<template>
  <el-card style="max-width: 480px">
    <template #header>
      <router-link :to="`/productDetail/${pid}`" v-slot="{navigate}" class="no-link">
        <div @click="navigate" class="card-header">
          <h3 class="name-size">{{ name }}</h3>
        </div>
      </router-link>
    </template>
    <el-carousel height="200px" motion-blur indicator-position="outside">
      <el-carousel-item v-for="(image,index) in images" :key="index">
        <router-link :to="`/productDetail/${pid}`" v-slot="{navigate}" class="no-link">
        <el-image @click="navigate" :src="image.imageUrl"></el-image>
        </router-link>
      </el-carousel-item>
    </el-carousel>
    <template #footer>
      <router-link :to="`/productDetail/${pid}`" v-slot="{navigate}" class="no-link">
        <div @click="navigate" class="card-header">
      <span class="price-size">¥{{ price }}</span>
        </div>
      </router-link>
    </template>
  </el-card>
</template>

<style scoped>
.name-size{
  font-size: 30px;
  color: black;
}
.price-size{
  left: 100px;
  font-size: 20px;
  color: black;
}
.no-link {
  text-decoration: none;
}
</style>
