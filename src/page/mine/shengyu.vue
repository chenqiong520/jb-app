<template>
  <div class="sy">
    <x-header :left-options="{backText: ''}">生育业务</x-header>
    <Group class="title_group">
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/sy01.png"/></span>
        <cell title="生育补贴" is-link></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/sy02.png"/></span>
        <cell title="男职工一次性生育补贴" is-link></cell>
      </div>
    </Group>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
export default {
  name: 'shengyu',
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
