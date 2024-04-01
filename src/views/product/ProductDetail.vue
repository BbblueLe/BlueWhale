<!--Lab2新增-商品详情界面-->
<script setup lang="ts">
import {getProductInfo} from "../../api/product.ts";
import { onMounted, reactive, ref} from "vue";
import UpdateInventory from "./components/UpdateInventory.vue";


//弹窗组件变量
const dialogVisible = ref(false)

//父组件传来的productId用于查询更新商品信息
const props = defineProps(['productId'])

//商品信息数组
const productInfo = reactive({
  name: '',
  price: 0,
  type: '',
  productImages: [{imageUrl: ''}],
  description: 'string',
  storeId: 0,
  inventory: 0
})

//展示商品详情前更新商品信息
function updateProductInfo() {
  getProductInfo(props.productId).then(res => {
    productInfo.name = res.data.result.name
    productInfo.price = res.data.result.price
    productInfo.type = res.data.result.type
    productInfo.productImages = res.data.result.productImages
    productInfo.description = res.data.result.description
    productInfo.storeId = res.data.result.store.storeId
    productInfo.inventory = res.data.result.inventory
  })
}

//身份验证，更新库存按钮是否可见
function checkRole() {
  const sid : string | null = sessionStorage.getItem('storeId')
  console.log(sid, productInfo)
  if(sid) {
    if (parseInt(sid) === productInfo.storeId) {
      return true
    }
  }
  return false
}
onMounted(()=> {
  updateProductInfo()
})
</script>



<template>
  <el-container>
    <el-aside width="25%" class="page-aside">
      <el-carousel
          height="400px" motion-blur indicator-position="outside"
      >
        <el-carousel-item v-for="(image,index) in productInfo.productImages" :key="index">
            <el-image :src="image.imageUrl" style="width: auto; height: 400px"></el-image>
        </el-carousel-item>
      </el-carousel>
      <el-descriptions
          class="margin-top"
          title="商品信息"
          :column="1"
          border
      >
        <template #extra>
          <el-button type="primary" v-show="checkRole()" @click="dialogVisible=true" color="#626aef">
            更新库存
          </el-button>
          <el-dialog v-model="dialogVisible" title="更新库存" width="900" draggable overflow>
            <UpdateInventory :productId="props.productId"></UpdateInventory>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogVisible=false;updateProductInfo()">取消</el-button>
                <el-button type="primary" @click="dialogVisible=false;updateProductInfo()">
                  确认
                </el-button>
              </div>
            </template>
          </el-dialog>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              商品名称
            </div>
          </template>
          {{productInfo.name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              商品价格
            </div>
          </template>
          ¥{{productInfo.price}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              商品类型
            </div>
          </template>
          <el-tag v-if="productInfo.type.toString() == 'FOOD'">食品</el-tag>
          <el-tag v-if="productInfo.type.toString() == 'CLOTHES'">服饰</el-tag>
          <el-tag v-if="productInfo.type.toString() == 'FURNITURE'">家具</el-tag>
          <el-tag v-if="productInfo.type.toString() == 'ELECTRONICS'">电子产品</el-tag>
          <el-tag v-if="productInfo.type.toString() == 'ENTERTAINMENT'">娱乐</el-tag>
          <el-tag v-if="productInfo.type.toString() == 'SPORTS'">体育用品</el-tag>
          <el-tag v-if="productInfo.type.toString() == 'LUXURY'">奢侈品</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              商品库存
            </div>
          </template>
          {{productInfo.inventory}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              商品描述
            </div>
          </template>
          {{productInfo.description}}
        </el-descriptions-item>
      </el-descriptions>

    </el-aside>
    <el-main>
        <el-text style="font-size: 50px">待用区， 将来用于展示评论区或者销售记录</el-text>
    </el-main>
  </el-container>
</template>


<style>
.page-aside {
  border-right: lightgrey solid 1px;
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
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}

</style>

