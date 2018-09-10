<template>
  <div class="yygh">
    <x-header :left-options="{backText: ''}">预约挂号</x-header>
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
      <cell title="挂号日期"  value="2018-04-28"></cell>
      <cell title="挂号类型"  :value="fmtType(scheduleInfo.OrderNumType)"></cell>
      <cell title="挂号费"  value="4元"></cell>
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
</template>

<script>
import {XHeader, Group, Cell, XButton} from 'vux'
import api from '../../router/api'
export default {
  name: 'yuyueguahao',
  components: {XHeader, Group, Cell, XButton},
  data () {
    return {
      doctorInfo: {},
      scheduleInfo: {},
      userInfo: {}
    }
  },
  mounted () {
    this.getScheduleInfo()
    this.getDoctor()
    if (window.localStorage['userInfo']) {
      this.userInfo = JSON.parse(window.localStorage['userInfo'])
    }
  },
  methods: {
    // 获取医生信息
    getDoctor () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.003', {orgCode: '44494768529212111A1001', deptCode: '19', doctorCode: '8026'})
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
    // 获取号源信息
    getScheduleInfo () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.005', {orgCode: '44494768529212111A1001', deptCode: '19', doctorCode: '8026', scheduleId: '1830'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.scheduleInfo = data.data[0]
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
      this.$router.push('/daizhifuxiangqing')
    }
  }
}
</script>

<style scoped lang="less">
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
</style>
