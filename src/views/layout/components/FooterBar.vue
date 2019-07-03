<template>
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="外卖">
      外卖
    </mt-tab-item>
    <mt-tab-item id="订单">
      订单
    </mt-tab-item>
    <mt-tab-item id="发现">
      发现
    </mt-tab-item>
    <mt-tab-item id="我的">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  name: 'FooterBar',
  data() {
    return {
      selected: '1'
    }
  }
}
</script>
