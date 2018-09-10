<template>
  <div class="idcardconfirm">
    <x-header :left-options="{backText: ''}">医保卡实名认证</x-header>

    <div v-show="step===1">
      <div class="title ">
        <span>基本信息(1/2)</span>
      </div>
      <Group class="title_group">
        <x-input title="身份证号码" v-model="IDCardNum"></x-input>
        <x-input title="电话号码" v-model="PhoneNum"></x-input>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
    <div v-show="step===2">
      <div class="title ">
        <span>附件信息(2/2)</span>
      </div>
      <Group class="title_group">
        <cell title="个人头像" value="预览" onclick="window.AndroidInterface.UploadHeaderPhoto()"></cell>
        <cell title="身份证正面" value="预览" onclick="window.AndroidInterface.UploadIDcard(0)"></cell>
        <cell title="身份证反面"  value="预览" onclick="window.AndroidInterface.UploadIDcard(1)"></cell>
      </Group>
      <div class="btn_group">
        <x-button class="submit_btn next_btn" @click.native="submit">提交</x-button>
        <x-button class="pre_next" @click.native="preStep">返回上一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XInput, Group, XButton, Cell, XHeader} from 'vux'
export default {
  name: 'idcardconfirm',
  components: {XInput, XHeader, XButton, Group, Cell},
  data () {
    return {
      step: 1,
      IDCardNum: window.localStorage['aac002'] || '',
      PhoneNum: ''
    }
  },
  mounted () {
    if (!window.localStorage['token']) {
      this.$vux.toast.text('请先登录', '')
      this.$router.push('/login')
    }
  },
  methods: {
    nextStep () {
      this.step = this.step + 1
    },
    preStep () {
      this.step = this.step - 1
    },
    submit () {
      if (this.IDCardNum === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入身份证号'
        })
        return
      }
      if (this.PhoneNum === '') {
        this.$vux.alert.show({
          title: '提示',
          content: '请输入电话号码'
        })
        return
      }
      console.log(this.PhoneNum)
      console.log(window.localStorage['token'])
      window.AndroidInterface.ConfirmUpload(this.IDCardNum, this.PhoneNum, window.localStorage['token'])
    }
  }
}
</script>

<style scoped>

</style>
