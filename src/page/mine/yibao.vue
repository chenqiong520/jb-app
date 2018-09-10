<template>
  <div class="yb">
    <x-header :left-options="{backText: ''}">医保业务</x-header>
    <Group class="title_group">
      <cell title="最近一次住院花费" value="00.00"></cell>
      <cell title="本年住院费用" value="00.00"></cell>
    </Group>
    <Group>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/yb01.png"/></span>
        <cell title="医保结算单" is-link link="/yibaobaoxiao"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/yb02.png"/></span>
        <cell title="医保卡信息" is-link link="/yibaoka"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/yb03.png"/></span>
        <cell title="医保划账" is-link link="/yibaohuazhang"></cell>
      </div>
    </Group>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
export default {
  name: 'yibao',
  components: {XHeader, Group, Cell},
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .yb {
    .weui-cell__ft {
      color: #0084ff;
    }
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
  }
</style>
