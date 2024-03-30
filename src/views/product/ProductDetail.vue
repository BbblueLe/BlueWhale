<!--Lab2新增-商品详情界面-->
<script setup lang="ts">
import {getProductInfo} from "../../api/product.ts";
import {reactive} from "vue";

const props = defineProps(['productId'])
const productInfo = reactive({
  name: '',
  price: 0,
  type: '',
  productImages: [{imageUrl: ''}],
  description: 'string'
})


getProductInfo(props.productId).then(res => {
  productInfo.name = res.data.result.name
  productInfo.price = res.data.result.price
  productInfo.type = res.data.result.type
  productInfo.productImages = res.data.result.productImages
  productInfo.description = res.data.result.description
})


</script>


<template>
  <el-container>
    <!--希望把商品详情的一部分内容放在这个侧边栏里，你要真不想放也没事-->
    <el-aside width="25%" class="page-aside">

    </el-aside>

    <el-main>
    </el-main>
  </el-container>
</template>


<style scoped>
.page-aside {
  border-right: lightgrey solid 1px;
}
</style>
