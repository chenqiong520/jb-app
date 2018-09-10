<template>
  <div class="jy">
    <x-header :left-options="{backText: ''}">就业业务</x-header>
    <Group class="title_group">
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/jy01.png"/></span>
        <cell title="就业签到" is-link></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/yl02.png"/></span>
        <cell title="补贴发放" is-link></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/jy03.png"/></span>
        <cell title="小额贷款" is-link></cell>
      </div>
    </Group>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
export default {
  name: 'jiuye',
  components: {XHeader, Group, Cell},
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  .item_wrapper {
    .icon {
      width: 18px;
      height: 18px;
      z-index:2;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .weui-cell {
      padding-left: 40px !important;
    }
  }
</style>
