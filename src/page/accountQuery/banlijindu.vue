<template>
  <div class="bljd">
    <x-header :left-options="{backText: ''}">办理进度</x-header>
    <div class="steps_vertical">
      <div class="step is_vertical" :class="step === 5? 'is_finish': ''">
        <div class="step_state">
          <span class="state_text">领卡状态</span>
        </div>
        <div class="step_head">
          <div class="ste_line"></div>
          <div class="step_icon">
            <img v-if="step===5" class="icon_img " src="./../../assets/shebao/success.png" />
            <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
          </div>
        </div>
        <div class="step_main">
          <div class="step_title">{{sbkInfo.baz059}}</div>
          <div class="step_description">
            <p><span>发卡网点：</span><span>{{sbkInfo.bzcc81}}</span></p>
            <p><span>发卡网点联系电话：</span><span>{{sbkInfo.baz015}}</span></p>
            <p><span>发卡网点地址：</span><span>{{sbkInfo.baz013}}</span></p>
          </div>
        </div>
      </div>
      <div class="step is_vertical " :class="step === 4? 'is_finish': ''">
        <div class="step_state">
          <span class="state_text">制卡情况</span>
        </div>
        <div class="step_head">
          <div class="ste_line"></div>
          <div class="step_icon">
            <img v-if="step===4" class="icon_img " src="./../../assets/shebao/success.png" />
            <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
          </div>
        </div>
        <div class="step_main">
          <div class="step_title">{{sbkInfo.baz108}}</div>
          <div class="step_description">
            <p><span>制卡日期：</span><span>{{sbkInfo.czz079}}</span></p>
            <p><span>发卡银行：</span><span>{{sbkInfo.aaz065}}</span></p>
          </div>
        </div>
      </div>
      <div class="step is_vertical " :class="step === 3? 'is_finish': ''">
        <div class="step_state">
          <span class="state_text">银行开户</span>
        </div>
        <div class="step_head">
          <div class="ste_line"></div>
          <div class="step_icon">
            <img v-if="step===3" class="icon_img " src="./../../assets/shebao/success.png" />
            <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
          </div>
        </div>
        <div class="step_main">
          <div class="step_title">{{sbkInfo.baz110}}</div>
          <div class="step_description">
            <p><span>开户日期：</span><span>{{sbkInfo.czz077}}</span></p>
          </div>
        </div>
      </div>
      <div class="step is_vertical " :class="step === 2? 'is_finish': ''">
        <div class="step_state">
          <span class="state_text">数据采集</span>
        </div>
        <div class="step_head">
          <div class="ste_line"></div>
          <div class="step_icon">
            <img v-if="step===2" class="icon_img " src="./../../assets/shebao/success.png" />
            <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
          </div>
        </div>
        <div class="step_main">
          <div class="step_title">已完成</div>
          <div class="step_description">
            <p><span>个人信息采集情况：</span><span>{{sbkInfo.bzcb01}}</span></p>
            <p><span>个人基础信息核准情况：</span><span>{{sbkInfo.bzcb07}}</span></p>
            <p><span>个人照片核准情况：</span><span>{{sbkInfo.bzcb43}}</span></p>
          </div>
        </div>
      </div>
      <div class="step is_vertical " :class="step === 1? 'is_finish': ''">
        <div class="step_state">
          <span class="state_text">信息对比</span>
        </div>
        <div class="step_head">
          <div class="step_icon">
            <img v-if="step===1" class="icon_img " src="./../../assets/shebao/success.png" />
            <img v-else class="icon_img finish" src="./../../assets/shebao/preStep.png" />
          </div>
        </div>
        <div class="step_main">
          <div class="step_title">已完成</div>
          <div class="step_description">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {XHeader} from 'vux'
import api from '../../router/api'
export default {
  name: 'banlijindu',
  components: {XHeader},
  data () {
    return {
      step: 1,
      sbkInfo: {
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
          console.log(this.step)
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    }
  }
}
</script>

<style scoped lang="less">
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
        top:0;
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
          &.finish {
            width: 19px;
            height: 19px;
          }
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
    }
  }
}
</style>
