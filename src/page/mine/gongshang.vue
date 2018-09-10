<template>
  <div class="gs">
    <x-header :left-options="{backText: ''}">工伤业务</x-header>
    <Group class="title_group">
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/gs01.png"/></span>
        <cell title="工伤快报" is-link></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/gs02.png"/></span>
        <cell title="工伤认定" is-link></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/gs03.png"/></span>
        <cell title="劳鉴认定" is-link></cell>
      </div>
    </Group>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
export default {
  name: 'gongshang',
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
