<template>
  <div class="ylfw">
    <x-header :left-options="{backText: ''}">养老服务</x-header>
    <Group class="title_group">
      <cell title="本月退休金实领取" value="00.00"></cell>
      <cell title="本年领取退休金" value="00.00"></cell>
    </Group>
    <Group>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/yl01.png"/></span>
        <cell title="养老认证" is-link></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/yl02.png"/></span>
        <cell title="补贴发放" is-link></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/yl03.png"/></span>
        <cell title="待遇领取" is-link></cell>
      </div>
    </Group>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
export default {
  name: 'yanglaofuwu',
  components: {XHeader, Group, Cell},
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .ylfw {
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
