<template>
  <div class="diet_content">
    <h2 class="title_h2">您一周会有几天吃新鲜蔬菜</h2>
    <label-select :data="diet" :selected-value="value" text-name="value" value-name="ItemCode" mode="single" @change="onLabelChange"/>
    <h2 class="title_h2">每天大概吃多少？<span>（1碟蔬菜约150g）</span></h2>
    <h2 class="title_h2">您一周会有几天吃新鲜水果？</h2>
    <h2 class="title_h2">每天大概吃多少？<span>（1个苹果约200g）</span></h2>
    <h2 class="title_h2">您一周会有几天吃禽/瘦肉？</h2>
    <h2 class="title_h2">每天大概吃多少？<span>（1个荤菜约100g）</span></h2>
    <h2 class="title_h2">每天食盐摄入量？<span>（1啤酒量约6g）</span></h2>
  </div>
</template>

<script>

export default {
  name: 'Drink',
  data() {
    return {
      selected: '1'
    }
  }
}
</script>
<style scoped>
  .diet_content{text-align:left;margin-top:70px}
  .diet_content ul{padding-left:0}
  .title_h2{font-size:13px;color:#b9b9b9;text-align:left;line-height:22px;font-weight:normal}
  .title_h2>span{font-size:18px;color:#ff9600}
</style>
