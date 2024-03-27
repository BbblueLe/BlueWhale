<!--Lab2新增-商店详情界面-->
<script setup lang="ts">
const props = defineProps(["storeId"])


</script>


<template>
  <el-container>
    <!--希望把商店详情的一部分内容放在这个侧边栏里，你要真不想放也没事-->
    <el-aside width="25%" class="page-aside">

    </el-aside>

    <el-main>
    <h1>{{ props.storeId }}</h1>
    </el-main>
  </el-container>
</template>


<style scoped>
.page-aside {
  border-right: lightgrey solid 1px;
}
</style>
