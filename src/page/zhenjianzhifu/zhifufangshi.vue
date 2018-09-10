<template>
  <div class="zffs">
    <x-header :left-options="{backText: ''}">支付方式选择</x-header>
    <div class="top_wrapper">
      <div class="clear item"><span>支付金额</span> <span class="price">4元</span></div>
      <div class="clear item" > <span>预约机构</span> <span class="address">长沙县星沙医院</span></div>
    </div>
    <div class="pay_way">
      <div class="item">其他支付方式</div>
      <div class="item clear"><img class="zfb_img" src="../../assets/支付宝.png" />支付宝支付 <i class="fa fa-angle-right"></i> </div>
      <div class="item clear"><img class="wx_img" src="../../assets/微信.png" />微信支付 <i class="fa fa-angle-right"></i> </div>
      <div class="item clear"><img class="wx_img" src="../../assets/sb.png" />社保卡支付 <i class="fa fa-angle-right"></i> </div>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
export default {
  name: 'zhifufangshi',
  components: {XHeader},
  data () {
    return {
      payInfo: {}
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.zffs {
  .top_wrapper {
    background-color: #fff;
  }
  .item {
    border-bottom: 1px solid #ebebeb;
    padding: 0 15px;
    line-height: 44px;
  }
  .price {
    float: right;
    color: #fb5224;
  }
  .address {
    float: right;
    color: #777777;
  }
  .pay_way {
    margin-top: 15px;
    background-color: #fff;
  }
  .zfb_img {
    width: 27px;
    height: 27px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .wx_img {
    max-width:27px;
    max-height: 27px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .fa-angle-right {
    float: right;
    line-height: 44px;
    color: #c7c7cc;
    font-size: 20px;
  }
}
</style>
