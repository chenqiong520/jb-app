<template>
  <div class="rjqd">
    <x-header :left-options="{backText: ''}">日结清单</x-header>
    <x-table :cell-bordered="false" style="background-color:#fff">
      <thead>
      <tr>
        <th>日期</th>
        <th>数量</th>
        <th>金额</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item , i) in list" :key="i" @click="toDetail(item.ZYSJ)">
        <td>{{item.ZYSJ}}</td>
        <td>{{item.RQDSL}}</td>
        <td> {{item.MTJE}}</td>
        <td class="tr_row"><i class="right_icon"></i></td>
      </tr>
      </tbody>
    </x-table>
    <div v-if="showNoData" style="text-align: center">
      <img style="width: 40%;margin: 10px 0" src="../../assets/no_data.png"/>
      <p>未查询到数据</p>
    </div>
  </div>
</template>

<script>
import {XHeader, Datetime, Group, XTable} from 'vux'
import api from '../../router/api.js'
export default {
  name: 'yibaobaoxiao',
  components: {XHeader, Datetime, Group, XTable},
  data () {
    return {
      list: [],
      showNoData: false
    }
  },
  mounted () {
    if (this.$route.params.akc190 && this.$route.params.akc190 !== 'undefined') {
      if (this.$route.params.aae072 && this.$route.params.aae072 !== 'undefined') {
        this.queryDayList(this.$route.params.akc190, this.$route.params.aae072)
      }
    }
  },
  methods: {
    queryDayList (akc190, aae072) {
      let params = api.getParam('F010.001.006', {akc190: akc190, aae072: aae072})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        this.showNoData = false
        if (data.code === 0) {
          this.list = data.data
          if (this.list.length < 1) {
            this.showNoData = true
          }
        } else {
          if (data.code === 500) {
            this.showNoData = true
            this.list = []
          } else {
            this.$vux.toast.text(data.msg, '')
          }
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    toDetail (date) {
      this.$router.push('/rijieqingdanmingxi/' + this.$route.params.akc190 + '/' + this.$route.params.aae072 + '/' + date)
    }
  }
}
</script>

<style scoped lang="less">
  .rjqd {
    table {
      font-size: 15px;
    }
    .tr_row {
      padding-right: 8px;
    }
    .right_icon {
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #C8C8CD;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    }
  }
</style>
