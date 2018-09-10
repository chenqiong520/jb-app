<template>
  <div class="setting gray_bg children">
    <x-header :left-options="{backText: ''}">系统设置</x-header>

    <div class="setting_div">
      <group>
        <x-switch title="微信提醒"></x-switch>
        <x-switch title="短信提醒"></x-switch>
      </group>

      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="logout">退出登录</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, XSwitch, Cell, XButton} from 'vux'

export default {
  components: {XHeader, Group, XSwitch, Cell, XButton},
  data () {
    return {
      disabled: 1,
      model: {
        remindWechat: true,
        remindMessage: true
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
    },
    changeWechat () {
    },
    changeMessage () {
    },
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .setting {

    .setting_div {
      margin-top: 0.2rem;

      > div:first-child {
        margin-top: 0.2rem;
      }

      .weui-cells {
        margin-top: 0;
      }

      .loginOut {
        margin-top: 1.0rem;
        .vux-cell-primary {
          text-align: center;
        }
      }
    }
  }
</style>
