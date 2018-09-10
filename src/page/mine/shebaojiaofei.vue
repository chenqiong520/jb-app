<template>
  <div class="sbjf">
    <x-header :left-options="{backText: ''}">社保缴费</x-header>
    <Group class="title_group">
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/syyw04.png"/></span>
        <cell title="缴费记录" is-link link="/jiaofeiliebiao"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/sb01.png"/></span>
        <cell title="灵活就业" is-link link="linghuojiuyejiaofei"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/sb02.png"/></span>
        <cell title="有单缴费" is-link link="youdanjiaofei"></cell>
      </div>
    </Group>
    <Group>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/sb03.png"/></span>
        <cell title="城居缴费" is-link link="chengjujiaofei"></cell>
      </div>
    </Group>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
export default {
  name: 'shebaojiaofei',
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
