<template>
  <div class="health_examination">
    <x-header :left-options="{backText: ''}" >健康体检</x-header>
    <Tab active-color="#0084ff">
      <tab-item @on-item-click="clickItem" :selected="index === '0'">总检结论</tab-item>
      <tab-item @on-item-click="clickItem" :selected="index === '1'">报告详情</tab-item>
    </Tab>
    <div class="general_conclusion" v-show="index === '0'">
      <div class="notice_con">
        <p class="tit">尊敬的客人：</p>
        <p>您好！感谢您光临本医院！您本次的体验检查结果如下，请您详阅读。如果您对检查结果又异议，请于一周内到本医院一楼大厅前查询，我们将为您排忧解难。</p>
        <p>联系地址：长沙县星沙开元路53号</p>
        <p>联系电话：0731-84012290</p>
        <p class="msg">欢迎您对我们的工作提出指导和建议，祝您健康！</p>
      </div>
      <div class="title">
        <span>体检综述</span>
      </div>
      <div class="main_con">
        <div>一般情况：正常</div>
      </div>
      <div class="title">
        <span>健康建议</span>
      </div>
      <div class="main_con">
        <div>一般情况：正常</div>
      </div>
      <div class="disclaimer">
        <p>免责申明：</p>
        <p>本结果来源于医院，仅供参考，具体请以体检报告为准。</p>
      </div>
    </div>
    <div v-show="index === '1'" class="report_detail">
      <divider>一般情况</divider>
      <div>
        <div class="title">
          <span>一般情况</span>
        </div>
        <div class="main_con">
          <div class="msg_item"><span class="label">出生年月</span> <span class="value">1996-09-08</span></div>
          <div class="msg_item"><span class="label">吸烟情况</span> <span>-</span></div>
          <div class="msg_item"><span class="label">体重</span> <span>kg</span></div>
          <div class="msg_item"><span class="label">血压</span> <span>mmHg</span></div>
          <div class="msg_item"><span class="label">每日运动量</span> <span>--</span></div>
          <div class="msg_item"><span class="label">身高</span> <span>CM</span></div>
          <div class="msg_item"><span class="label">联系电话</span> <span>--</span></div>
          <div class="msg_item"><span class="label">饮酒习惯</span> <span>--</span></div>
          <div class="msg_item"><span class="label">住址</span> <span>星沙</span></div>
          <div class="msg_item"><span class="label">身份证</span> <span>--</span></div>
          <div class="msg_item"><span class="label">症状</span> <span>正常</span></div>
          <div class="msg_item"><span class="label">年龄</span> <span>岁</span></div>
          <div class="msg_item"><span class="label">牙齿</span> <span>岁</span></div>
        </div>
        <div class="card_footer">
          <span>检查日期：2018-04-03 <span>体检医生：--</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem, XHeader, Divider} from 'vux'
export default {
  name: 'healthExamination',
  components: {Tab, TabItem, XHeader, Divider},
  data () {
    return {
      index: '0'
    }
  },
  methods: {
    clickItem (index) {
      this.index = index.toString()
    }
  }
}
</script>

<style scoped lang="less">
  .health_examination {
    color: #333;
    .main_con {
      border-top: solid 1px #e5e5e5;
      border-bottom: solid 1px #e5e5e5;
      background-color: #fff;
      padding: 15px;
      font-size: 15px;
    }
    .general_conclusion {
      .notice_con {
        padding: 15px;
        background-color: #fff;
        line-height: 30px;
        font-size: 14px;
        color: #777777;
        .tit {
          color: #333;
          font-size: 16px;
        }
        .msg {
          font-weight: bold;
        }
      }
      .disclaimer {
        line-height: 25px;
        margin: 15px;
        font-size: 14px;
        color: #777777;
      }
    }
    .report_detail {
      .vux-divider {
        padding: 15px 0 0 0;
      }
    }
    .msg_item {
      margin: 8px auto;
      .label {
        display: inline-block;
        width: 110px;
      }
    }
    .card_footer {
      background-color: #fff;
      padding: 12px;
      font-size: 15px;
      text-align: right;
    }
  }
</style>
