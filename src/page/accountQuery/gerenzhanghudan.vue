<template>
  <div class="grzhd">
    <x-header v-show="step ===1" :left-options="{backText: ''}">个人账户单</x-header>
    <x-header  v-show="step !==1" :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack">{{titleMsg}}</x-header>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div v-show="step === 1">
          <div class="title">
            <span>基本信息</span>
          </div>
          <Group class="title_group">
            <cell title="姓名" :value="accountInfo.xm"></cell>
            <cell title="个人编号" :value="accountInfo.grbh"></cell>
            <cell title="身份证" :value="accountInfo.sfzh"></cell>
            <cell title="单位编号" :value="accountInfo.dwbh"></cell>
            <cell title="单位名称" :value="accountInfo.dwmc"></cell>
            <cell title="制表时间" :value="nowDate"></cell>
          </Group>

          <div class="title">
            <span>个人账户单</span>
          </div>
          <Group class="title_group">
            <cell title="险种类型" value="养老保险"></cell>
            <cell title="应缴月数" :value="accountInfo.yjys"></cell>
            <cell title="实缴月数" :value="accountInfo.sjys"></cell>
            <cell title="本年度实缴月数" :value="accountInfo.sjjf.sjys"></cell>
          </Group>

          <div class="title">
            <span>详情</span>
          </div>
          <Group class="title_group">
            <cell title="历年社平工资及缴费基数" is-link @click.native="Tostep(2)"></cell>
            <cell title="历年缴费明细" is-link @click.native="Tostep(3)"></cell>
          </Group>
        </div>
        <div v-show="step===2">
          <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
            <tr>
              <th>缴费年度</th>
              <th>社平工资/缴费基数</th>
              <th>实缴月数</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, i) in accountInfo.ylndjfjl" :key="i">
              <td>{{item.nd}}</td>
              <td>{{item.spgz}} / {{item.gz}}</td>
              <td>{{item.sjyf}}</td>
            </tr>
            </tbody>
          </x-table>
        </div>
        <div v-show="step===3">
          <div class="item_content" v-for="(item, i) in  accountInfo.xzjfjl" :key="i">
            <div class="item_record"><span class="item_key">险种类型</span> <span class="item_value">{{item.xzlxHZ}}</span>
            </div>
            <div class="item_record"><span class="item_key">单位编号</span> <span class="item_value">{{item.dwbh}}</span>
            </div>
            <div class="item_record"><span class="item_key">单位名称</span> <span class="item_value">{{item.dwmc}}</span>
            </div>
            <div class="item_record"><span class="item_key">缴费起止时间</span> <span class="item_value">{{item.begin}} - {{item.end}}</span>
            </div>
            <div class="item_record"><span class="item_key">应缴月数</span> <span class="item_value">{{item.yjys}}</span>
            </div>
            <div class="item_record"><span class="item_key">实缴月数</span> <span class="item_value">{{item.sjys}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell, XTable} from 'vux'
import BScroll from 'better-scroll'
import api from '../../router/api'

export default {
  name: 'gerenzhangdan',
  components: {XHeader, Group, Cell, XTable},
  data () {
    return {
      nowDate: this.$root.formatDate(new Date(), 'yyyy-MM-dd'),
      accountInfo: {
        xm: '', // 姓名
        grbh: '', // 个人编号
        sfzh: '', // 证件号码
        dwbh: '', // 单位编号
        dwmc: '', // 单位名称
        yjys: '', // 应缴月数
        sjys: '', // 实缴月数
        sjjf: {sjys: ''}, // 社保保险经办机构
        xzjfjl: [], // 历年缴费明细
        ylndjfjl: [] // 社平工资/缴费基数
      },
      step: 1,
      titleMsg: ''
    }
  },
  mounted () {
    this.getAccountInfo()
  },
  methods: {
    getAccountInfo () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('F002.001.005', {aac001: window.localStorage['nowPersonNo']})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.accountInfo = data.data
        } else {
          this.$vux.toast.text(data.msg, '')
        }
        this.$nextTick(() => {
          this._initScroll()
        })
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    _initScroll () {
      this.scroll = new BScroll(this.$refs.content, {
        click: true
      })
    },
    Tostep (step) {
      this.step = step
      if (step === 2) {
        this.titleMsg = '社平工资/缴费基数'
      } else {
        this.titleMsg = '历年缴费明细'
      }
      this.$nextTick(() => {
        this.scroll.refresh()
        this.scroll.scrollTo(0, 0, 500)
      })
    },
    goBack () {
      this.step = 1
      this.$nextTick(() => {
        this.scroll.refresh()
        this.scroll.scrollTo(0, 0, 500)
      })
    }
  }
}
</script>

<style scoped lang="less">
  .grzhd {
    .item_record {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .item_content {
      background-color: #fff;
      padding: 10px 15px;
      font-size: 14px;
      position: relative;
      border-top: solid 1px #ebebeb;
      .item_key {
        display: inline-block;
        margin-right: 12px;
      }
      .item_value {
        color: #777;
      }
      .item_state {
        font-size: 13px;
        line-height: 13px;
        position: absolute;
        top: 10px;
        right: 15px;
        width: 135px;
        padding: 5px 0;
        background-color: #0084ff;
        text-align: center;
        color: #fff;
        border-radius: 10px;
      }
    }
    .vux-table td, .vux-table th {
      font-size: 15px;
    }
  }
</style>
