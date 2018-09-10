<template>
  <div class="djba">
    <x-header :left-options="{backText: ''}">登记备案</x-header>
    <Group>
      <cell title="发放银行/社保卡刷卡行" value="长沙银行"></cell>
      <cell title="失业保险缴费月数" value="71"></cell>
      <cell title="原单位地址" value="长沙市宁乡县经济开发区"></cell>
      <cell title="参保起止时间" value="在职人员接触劳动合同"></cell>
      <cell title="待遇金额" value=""></cell>
      <cell title="待遇可享受月数" value=""></cell>
    </Group>
    <Group>
      <cell title="审核意见" ></cell>
    </Group>
    <div class="attachment">
      <span>附件上传</span>
    </div>
    <Group class="attachment_group">
      <cell title="接触劳动关系证明" value="预览" is-link></cell>
      <cell title="个人身份证正面" value="预览" is-link></cell>
      <cell title="个人身份证反面" value="预览" is-link></cell>
      <cell title="就失业登记证" value="预览" is-link></cell>
    </Group>
  </div>
</template>

<script>
import {XHeader, Cell, Group} from 'vux'
export default {
  name: 'djba',
  components: {XHeader, Cell, Group},
  data () {
    return {}
  }
}
</script>

<style lang="less">
.djba {
  .vux-header {
    background-color: #0084ff;
  }
  .weui-cell {
    padding: 15px;
    font-size: 15px;
    &:before {
      right: 15px;
    }
  }
  .attachment {
    margin-top: 18px;
    background-color: #fff;
    padding: 15px;
    span {
      display: inline-block;
      padding-left: 15px;
      border-left: solid 4px #0084ff;
    }
  }
  .weui-cells {
    margin-top: 18px;
  }
  .attachment_group {
    .weui-cells {
      margin-top: 0;
    }
  }
}
</style>
