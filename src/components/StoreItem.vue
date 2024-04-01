<!--Lab2新增-->
<!--商店列表父组件中的单个商店子组件-->
<script setup lang="ts">
  //父组件传入的store信息
  const props = defineProps(['store'])
</script>

<template>
  <el-card  style="width: 350px; height: auto" shadow="hover" class="store-cards">
    <el-image :src="props.store.logoLink" class="store-img" ></el-image>
    <div>
      <br>
      <span class="store-name">{{props.store.name}}</span>
    </div>
  </el-card>
</template>

<style scoped>
.store-name{
  font-size: 20px;
}
.store-cards{
  position: relative;
}
.store-img{
  width: 350px;
  height: 300px;
  overflow-y: auto;
}
</style>
