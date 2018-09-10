<template>
  <div class="sybt">
    <x-header :left-options="{backText: ''}">失业业务</x-header>
    <Group class="title_group">
      <cell title="本月失业金实例" value="00.00"></cell>
      <cell title="本年领取失业金" value="00.00"></cell>
    </Group>
    <Group>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/syyw01.png"/></span>
        <cell title="登记备案" is-link link="/djba"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/syyw02.png"/></span>
        <cell title="培训补助" is-link link="/trainSubsidy"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/syyw03.png"/></span>
        <cell title="生育补助" is-link link="/birthAllowance"></cell>
      </div>
      <div class="item_wrapper">
        <span class="tip icon"><img src="../../assets/mine/syyw04.png"/></span>
        <cell title="复发登记" is-link link="/recurRegistration"></cell>
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
  .sybt {
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
