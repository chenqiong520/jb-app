<template>
  <div class="sbk">
    <div v-show="!showProcess">
      <x-header :left-options="{backText: ''}">我的社保卡</x-header>
      <div class="img_wrapper">
        <div class="photo_card" >
          <img v-if="sbkInfo.bzcb18" class="photo_header" :src="'data:image/gif;base64,' + sbkInfo.bzcb18" />
          <div class="name">{{sbkInfo.aac003}}</div>
          <div class="id_card">{{sbkInfo.aac002}}</div>
          <div class="bank_card">{{sbkInfo.aae010}}</div>
        </div>
      </div>
      <Group>
        <div class="item_wrapper">
          <span class="tip icon"><img src="../../assets/shebao/03.png"/></span>
          <cell title="发卡银行" :value="sbkInfo.aaz065" ></cell>
        </div>
        <div class="item_wrapper">
          <span class="tip icon"><img src="../../assets/shebao/02.png"/></span>
          <cell title="发卡网点" :value="sbkInfo.bzcc81"></cell>
        </div>
        <div class="item_wrapper">
          <span class="tip icon"><img src="../../assets/shebao/01.png"/></span>
          <cell title="卡状态" :value="sbkInfo.baz059" ></cell>
        </div>
      </Group>
      <Group>
        <cell title="社保卡办理进度" is-link @click.native="showProcess = true"></cell>
      </Group>
    </div>
    <div class="bljd" v-show="showProcess">
      <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack">办理进度</x-header>
      <div class="steps_vertical">
        <div class="step is_vertical " :class="step >= 1? 'is_finish': ''">
          <div class="step_state">
            <span class="state_text">信息对比</span>
          </div>
          <div class="step_head">
            <div class="ste_line"></div>
            <div class="step_icon">
              <img v-if="step>=1" class="icon_img " src="./../../assets/shebao/success.png" />
              <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
            </div>
          </div>
          <div class="step_main">
            <div class="step_title">基本信息</div>
            <div class="step_description">
              <p><span>姓名：</span><span>{{sbkInfo.aac003}}</span></p>
              <p><span>身份证：</span><span>{{sbkInfo.aac002}}</span></p>
            </div>
          </div>
        </div>
        <div class="step is_vertical " :class="step >= 2? 'is_finish': ''">
          <div class="step_state">
            <span class="state_text">数据采集</span>
          </div>
          <div class="step_head">
            <div class="ste_line"></div>
            <div class="step_icon">
              <img v-if="step>=2" class="icon_img " src="./../../assets/shebao/success.png" />
              <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
            </div>
          </div>
          <div class="step_main">
            <div class="step_title"><span v-if="sbkInfo.bzcb01">已完成</span> <span v-else>未完成</span></div>
            <div class="step_description">
              <p><span>个人信息采集情况：</span><span>{{sbkInfo.bzcb01}}</span></p>
              <p><span>个人基础信息核准情况：</span><span>{{sbkInfo.bzcb07}}</span></p>
              <p><span>个人照片核准情况：</span><span>{{sbkInfo.bzcb43}}</span></p>
            </div>
          </div>
        </div>
        <div class="step is_vertical " :class="step >= 3? 'is_finish': ''">
          <div class="step_state">
            <span class="state_text">银行开户</span>
          </div>
          <div class="step_head">
            <div class="ste_line"></div>
            <div class="step_icon">
              <img v-if="step>=3" class="icon_img " src="./../../assets/shebao/success.png" />
              <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
            </div>
          </div>
          <div class="step_main">
            <div class="step_title"><span v-if="sbkInfo.baz110">{{sbkInfo.baz110}}</span> <span v-else>未完成</span> </div>
            <div class="step_description">
              <p><span>开户日期：</span><span>{{sbkInfo.czz077}}</span></p>
            </div>
          </div>
        </div>
        <div class="step is_vertical " :class="step >= 4? 'is_finish': ''">
          <div class="step_state">
            <span class="state_text">制卡情况</span>
          </div>
          <div class="step_head">
            <div class="ste_line"></div>
            <div class="step_icon">
              <img v-if="step>=4" class="icon_img " src="./../../assets/shebao/success.png" />
              <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
            </div>
          </div>
          <div class="step_main">
            <div class="step_title"><span v-if="sbkInfo.baz108">{{sbkInfo.baz108}}</span> <span v-else>未完成</span></div>
            <div class="step_description">
              <p><span>制卡日期：</span><span>{{sbkInfo.czz079}}</span></p>
              <p><span>发卡银行：</span><span>{{sbkInfo.aaz065}}</span></p>
            </div>
          </div>
        </div>
        <div class="step is_vertical" :class="step >= 5? 'is_finish': ''">
          <div class="step_state">
            <span class="state_text">领卡状态</span>
          </div>
          <div class="step_head">
            <div class="step_icon">
              <img v-if="step>=5" class="icon_img " src="./../../assets/shebao/success.png" />
              <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
            </div>
          </div>
          <div class="step_main">
            <div class="step_title"><span v-if="sbkInfo.baz059">{{sbkInfo.baz059}}</span> <span v-else>未完成</span></div>
            <div class="step_description">
              <p><span>发卡网点：</span><span>{{sbkInfo.bzcc81}}</span></p>
              <p><span>发卡网点联系电话：</span><span style="color: #0084ff">{{sbkInfo.baz015}}</span></p>
              <p><span>发卡网点地址：</span><span>{{sbkInfo.baz013}}</span></p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
import api from '../../router/api'
export default {
  name: 'shebaoka',
  components: {XHeader, Group, Cell},
  data () {
    return {
      step: 1,
      showProcess: false,
      sbkInfo: {
        aac002: '', // 身份证号
        aac003: '', // 姓名
        bzcb18: '', // 图片
        aaz065: '', // 开户银行
        baz059: '', // 状态
        baz015: '', // 状态
        bzcb01: '', // 个人信息采集
        bzcb43: '', // 个人照片核准
        bzcb07: '', // 个人基础信息核准
        baz110: '', // 开户
        baz108: '', // 制卡
        czz079: '', // 制卡日期
        czz077: '', // 开户日期
        baz013: '', // 银行网点地址
        aae010: '', // 社保卡号
        bzcc81: '' // 机构
      }
    }
  },
  mounted () {
    this.getSBKInfo()
  },
  methods: {
    getSBKInfo () {
      const params = api.getParam('F002.001.007', {aac001: window.localStorage['nowPersonNo'], aac002: window.localStorage['aac002']})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.length > 0) {
            this.sbkInfo = data.data[0]
            if (this.sbkInfo.bzcb01 === '已采集') {
              this.step = 2
            }
            if (this.sbkInfo.baz110 === '已开户') {
              this.step = 3
            }
            if (this.sbkInfo.baz108 === '已制卡') {
              this.step = 4
            }
            if (this.sbkInfo.baz059 === '已领卡') {
              this.step = 5
            }
          }
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    goBack () {
      this.showProcess = false
    }
  }
}
</script>

<style scoped lang="less">
  .sbk {
    .img_wrapper {
      text-align: center;
      padding-top: 10px;
      .photo_card {
        display: inline-block;
        background-image: url('../../assets/shebao/card.jpg');
        width: 311px;
        height: 197px;
        background-size: 100% 100%;
        position: relative;
        font-size: 11px;
      }
      .photo_header {
        position: absolute;
        top:48px;
        left: 13px;
        height: 81px;
      }
      .name {
        position: absolute;
        top:50px;
        left: 115px;
      }
      .id_card {
        position: absolute;
        top:70px;
        left: 158px;
      }
      .bank_card {
        position: absolute;
        left:58px;
        bottom: 34px;
        font-size: 18px;
      }
    }
  }
  .item_wrapper {
  .icon {
    width: 20px;
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

  .steps_vertical {
    display: flex;
    flex-flow: column;
    background-color: #fff;
    padding: 10px;
    .step {
      display: flex;
      position: relative;
      flex-shrink: 1;
      flex-basis: 130px;
      color: #999;
      &:last-of-type {
        flex-basis: auto!important;
      }
      .step_state {
        flex-grow: 0;
        width: 70px;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
        white-space: nowrap;
        .state_text {
          display: block;
          width: 60px;
        }
      }
      .step_head {
        flex-grow: 0;
        width: 19px;
        position: relative;
        .ste_line {
          position: absolute;
          width: 1px;
          background-color: #e9e9e9;
          top:15px;
          bottom: 0;
          left: 9px;
        }
        .step_icon {
          position: relative;
          z-index: 1;
          width: 19px;
          height: 19px;
          box-sizing: border-box;
          text-align: center;
          line-height: 19px;
          .icon_img {
            width: 15px;
            height: 15px;
          }
        }
      }
      .step_main {
        padding-left: 10px;
        flex-grow: 1;
        .step_title {
          font-size: 15px;
          margin-bottom: 8px;
        }
        .step_description {
          font-size: 12px;
          line-height: 18px;
        }
      }
      &.is_finish {
        .step_state .state_text, .step_main .step_title {
          color: #0084ff;
        }
        .step_main .step_description {
          color: #666;
        }
        .step_head .ste_line {
          background-color: #0084ff;
        }
      }
    }
  }
</style>
