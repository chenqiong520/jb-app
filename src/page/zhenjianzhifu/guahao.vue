<template>
  <div class="guahao">
    <div v-show = "!isShow">
      <x-header :left-options="{backText: ''}">挂号</x-header>
      <div>
        <div class="doc_msg">
          <img class="doc_img" src="../../assets/doctor.png"/>
          <div class="text_wrapper">
            <div class="name">{{doctorInfo.doctorName}}&nbsp; &nbsp;{{fmtTitle(doctorInfo.doctorTitle)}}</div>
            <div class="tt">{{doctorInfo.orgName}}&nbsp; &nbsp; {{doctorInfo.deptName}}</div>
          </div>
        </div>
        <tab active-color="#0084ff" :line-width="2">
          <tab-item selected @on-item-click="onItemClick">排班</tab-item>
          <tab-item @on-item-click="onItemClick">介绍</tab-item>
        </tab>
        <div  class="item_con" v-show = "activeIndex === 0">
          <div class="appointment_time clear" @click="appointment(item)" v-for="(item,i) in list" :key="i">
            <div class="left"> <img class="date_img" src="../../assets/date.png"/> {{item.scheduleDate}} {{fmtRange(item.timeRange)}}</div>
            <div class="right"><span class="surplus">余号：<span class="num">{{item.regLeftCount}}</span></span><i class="fa fa-angle-right"></i></div>
          </div>
        </div>
        <div  v-show = "activeIndex === 1" class="desc_con">
          {{doctorInfo.doctorDesc}}
        </div>
      </div>
    </div>
    <div class="yygh" v-show="isShow">
      <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack">预约挂号</x-header>
      <div class="doc_msg">
        <img class="doc_img" src="../../assets/doctor.png"/>
        <div class="text_wrapper">
          <div class="name">{{doctorInfo.doctorName}}</div>
          <div class="tt">{{fmtTitle(doctorInfo.doctorTitle)}}</div>
        </div>
      </div>
      <Group class="title_group">
        <cell title="就诊医院"  :value="doctorInfo.orgName"></cell>
        <cell title="就诊科室"  :value="doctorInfo.deptName"></cell>
        <cell title="挂号日期"  :value="scheduleInfo.scheduleDate"></cell>
        <cell title="挂号类型"  :value="fmtType(scheduleInfo.OrderNumType)"></cell>
        <cell title="挂号费"  :value="scheduleInfo.visitCost +'元'"></cell>
      </Group>

      <Group>
        <cell title="就诊人"  :value="userInfo.fullname"></cell>
        <cell title="卡类型"  value="身份证号"></cell>
        <cell title="卡号码"  :value="userInfo.aac002"></cell>
      </Group>
      <div class="ckeck_wrapper">
        <input id="rule" class="checkbox" name="rule" type="checkbox" />我已经同意并了解了以下原则，点击<a class="detail">查看详情</a>。
      </div>
      <div class="btn_group">
        <x-button class="submit_btn" @click.native="submitAppoint">提交预约</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell, Tab, TabItem, XButton} from 'vux'
import api from '../../router/api'
export default {
  name: 'menzhen',
  components: {XHeader, Group, Cell, Tab, TabItem, XButton},
  data () {
    return {
      orgCode: this.$route.params.orgCode,
      deptCode: this.$route.query.deptCode,
      doctorCode: this.$route.query.doctorCode,
      activeIndex: 0,
      doctorInfo: {},
      list: [],
      scheduleInfo: {},
      userInfo: {},
      isShow: false
    }
  },
  mounted () {
    this.getSchedule()
    this.getDoctor()
    if (window.localStorage['userInfo']) {
      this.userInfo = JSON.parse(window.localStorage['userInfo'])
    }
  },
  methods: {
    // 获取医生信息
    getDoctor () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.003', {orgCode: this.orgCode, deptCode: this.deptCode, doctorCode: this.doctorCode})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.doctorInfo = data.data[0]
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 获取医生排班
    getSchedule () {
      let date = new Date().setDate(new Date().getDate() + 6)
      let endDate = this.$root.formatDate(new Date(date), 'yyyy-MM-dd')
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.004', {startDate: this.$root.formatDate(new Date(), 'yyyy-MM-dd'), orgCode: this.orgCode, deptCode: this.deptCode, doctorCode: this.doctorCode, endDate: endDate})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 获取号源信息
    getScheduleInfo (item) {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.005', {orgCode: item.orgCode, deptCode: item.deptCode.toString(), doctorCode: item.doctorCode.toString(), scheduleId: item.scheduleId.toString()})
      api.postData(this, params).then((data) => {
        this.isShow = true
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.scheduleInfo = data.data[0]
          this.scheduleInfo.scheduleDate = item.scheduleDate
          this.scheduleInfo.visitCost = item.visitCost
          this.scheduleInfo.deptCode = item.deptCode
          this.scheduleInfo.orgCode = item.orgCode
          this.scheduleInfo.doctorCode = item.doctorCode
          this.scheduleInfo.timeRange = item.timeRange
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    fmtTitle (num) {
      if (num === 1) {
        return '住院医生'
      } else if (num === 2) {
        return '主治医生'
      } else if (num === 3) {
        return '副主任医生'
      } else if (num === 4) {
        return '名老专家'
      } else if (num === 0) {
        return '其他'
      }
    },
    fmtRange (timeRang) {
      if (timeRang === 1) {
        return '上午'
      } else if (timeRang === 2) {
        return '下午'
      } else if (timeRang === 3) {
        return '晚上'
      } else if (timeRang === 4) {
        return '全天'
      }
    },
    onItemClick (index) {
      this.activeIndex = index
    },
    appointment (item) {
      this.getScheduleInfo(item)
    },
    fmtType (typeNo) {
      if (typeNo === 1) {
        return '专家'
      } else if (typeNo === 2) {
        return '普通'
      }
    },
    submitAppoint () {
      let check = document.getElementById('rule').checked
      if (!check) {
        this.$vux.alert.show({
          title: '提示',
          content: '请查看详情并同意'
        })
        return
      }
      let regType = '0'
      if (this.scheduleInfo.scheduleDate === this.$root.formatDate(new Date(), 'yyyy-MM-dd')) {
        regType = '1'
      }
      let param = {
        cardId: this.userInfo.aac002,
        cardType: '1',
        name: this.userInfo.fullname,
        numberinfoId: this.scheduleInfo.numberinfoId,
        scheduleId: this.scheduleInfo.scheduleId.toString(),
        orgCode: this.scheduleInfo.orgCode.toString(),
        deptCode: this.scheduleInfo.deptCode.toString(),
        doctorCode: this.scheduleInfo.doctorCode.toString(),
        timeRange: this.scheduleInfo.timeRange.toString(),
        regDate: this.scheduleInfo.scheduleDate,
        regType: regType // 0：预约挂号，1:当日挂号
      }
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.002.001', param)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.$router.push('/guahaoxiangqing/' + data.data.orderId)
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    goBack () {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="less">
  .guahao {
    .desc_con {
      line-height: 26px;
      background-color: #fff;
      padding: 10px 15px;
    }
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
    .item_con {
      padding: 0 15px;
      background-color: #fff;
      box-sizing: border-box;
      .fa-angle-right {
        color: #c7c7cc;
        font-size: 20px;
      }
      .appointment_time {
        height: 44px;
        line-height: 44px;
        color: #777;
        border-bottom: 1px solid #ebebeb;
        .right {
          float: right;
          .surplus {
            .num {
              color: #0084ff;
              margin-right: 10px;
            }
          }
        }
        .left {
          float: left;
          .date_img {
            width: 17px;
            height: 16px;
            vertical-align: text-top;
          }
        }
      }
    }

    .yygh {
      .doc_msg {
        padding:15px;
        background-color: #fff;
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
      .submit_btn {
        margin-top: 30px;
      }
      .ckeck_wrapper {
        margin-top: 20px;
        margin-left: 15px;
        line-height: 23px;
        font-size: 13px;
        .checkbox {
          width: 17px;
          height: 17px;
          vertical-align: bottom;
        }
        .detail {
          color: #0084ff;
        }
      }
    }
  }
</style>
