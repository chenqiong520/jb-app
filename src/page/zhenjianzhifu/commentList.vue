<template>
  <div class="comment_list">
    <x-header :left-options="{backText: ''}">评价</x-header>
      <div class="doc_msg">
        <img class="doc_img" src="../../assets/doctor.png"/>
        <div class="text_wrapper">
          <div class="name">王某某&nbsp; &nbsp;主任医生</div>
          <div class="tt">长沙县星沙医院&nbsp; &nbsp; 口腔科</div>
        </div>
      </div>
    <div>
      <div class="title ">
        <span>医生评价</span>
      </div>
      <div class="com_item">
        <Flexbox>
          <flexbox-item>
            <img class="user_img" src="../../assets/c_user.png"/>
            <div class="user_info">
              <div class="name">匿名</div>
              <div class="time">2018-07-30</div>
            </div>
          </flexbox-item>
          <flexbox-item style="text-align: right">
            <rater v-model="rate" active-color="#FF9900" :margin="3"></rater>
          </flexbox-item>
        </Flexbox>
        <p class="content">非常有耐心，询问详细，医术高超，非常满意,非常满意。</p>
      </div>
      <div class="com_item">
        <Flexbox>
          <flexbox-item>
            <img class="user_img" src="../../assets/c_user.png"/>
            <div class="user_info">
              <div class="name">匿名</div>
              <div class="time">2018-07-30</div>
            </div>
          </flexbox-item>
          <flexbox-item style="text-align: right">
            <rater v-model="rate" active-color="#FF9900" :margin="3"></rater>
          </flexbox-item>
        </Flexbox>
        <p class="content">非常有耐心，询问详细，医术高超，非常满意,非常满意。</p>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Rater, Flexbox, FlexboxItem} from 'vux'
export default {
  name: 'commentList',
  components: {XHeader, Rater, Flexbox, FlexboxItem},
  data () {
    return {
      rate: 4
    }
  }
}
</script>

<style scoped lang="less">
  .comment_list {
    .doc_msg {
      padding:15px;
      background-color: #fff;
      margin-bottom: 15px;
      .doc_img {
        width: 45px;
        height: 45px;
        vertical-align: top;
      }
      .text_wrapper {
        display: inline-block;
        margin-left: 10px;
        .tt {
          color: #777;
          margin-top: 6px;
          font-size: 12px;
        }
      }
    }
    .com_item {
      background-color: #fff;
      padding: 15px;
      border-top:1px solid #ededed;
      .user_img {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        vertical-align: top;
      }
      .user_info {
        display: inline-block;
        .time {
          color: #a3a3a3;
          font-size: 13px;
          margin-top: 3px;
        }
      }
      .content {
        margin-top: 10px;
        color: #777;
      }
    }
  }

</style>
