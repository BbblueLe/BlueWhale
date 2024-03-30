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
    <el-aside>
      <el-space direction="vertical">
        <h1>
          商品详细信息
        </h1>
        <el-text class="mx-1" size="large" tag="b">
          商品名称:{{productInfo.name}}
        </el-text>
        <el-text class="mx-1" size="large" tag="b">
          商品价格:{{productInfo.price}}
        </el-text>
        <el-text class="mx-1" size="large" tag="b">
          商品类型:{{productInfo.type}}
        </el-text>
      </el-space>
    </el-aside>
    <el-main>
      <div class="demo-image">
        <el-text class="mx-1" size="large" tag="b">
          商品图片展示
        </el-text>
        <div>
          <P v-if="productInfo.productImages.length == 0">
            <el-text class="mx-1" size="large" tag="b">
              该商品暂无图片展示
            </el-text>
          </P>
          <P v-for="(image) in productInfo.productImages">
            <el-image style="width: 700px; height: 700px" :src="image.imageUrl"  />
          </P>
        </div>
      </div>
    </el-main>
  </el-container>
</template>


<style>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #d3dce6; color: #333; text-align: center; line-height: 200px;
}
.el-main {
  background-color: #ded6d6; color: #333; text-align: center; line-height: 160px;
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
</style>

