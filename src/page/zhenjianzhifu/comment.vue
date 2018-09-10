<template>
  <div class="comment">
    <x-header :left-options="{backText: ''}">发表评价</x-header>
    <div class="con">
      <div class="rate_wrapper">
        <span class="txt_span">满意度</span>
        <rater v-model="rate" active-color="#FF9900" :margin="4"></rater>
      </div>
      <group class="title_group">
        <x-textarea :max="200" name="detail" placeholder="请为医生对您的服务评价，让我们可以更好的为您服务" :rows="5"></x-textarea>
      </group>
    </div>
  </div>
</template>

<script>
import {XHeader, Rater, Group, XTextarea} from 'vux'
export default {
  name: 'comment',
  components: {XHeader, Rater, Group, XTextarea},
  data () {
    return {
      rate: 0
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  .con {
    background-color: #fff;
    .rate_wrapper {
      padding: 10px 15px;
      .txt_span {
        display: inline-block;
        line-height: 25px;
        margin-right: 10px;
        vertical-align: top;
      }
    }
  }
}
</style>
