<template>
  <div class="yibaobaoxiao">
    <x-header :left-options="{backText: ''}">医保结算单</x-header>
    <group class="title_group">
      <datetime title="年度" v-model="query.year" format="YYYY" :max-year="maxYear()" @on-confirm="queryToYear"> </datetime>
    </group>

    <x-table :cell-bordered="false" style="background-color:#fff; margin-top: 15px">
      <thead>
      <tr>
        <th>住院编号</th>
        <th>日期</th>
        <th>金额</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item , i) in list" :key="i" @click="toDetail(item.AKC190)">
        <td>{{item.AKC190}}</td>
        <td>{{item.AAE036}}</td>
        <td> {{item.AKC264}}</td>
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
      query: {
        year: this.$root.formatDate(new Date(), 'yyyy')
      },
      list: [],
      showNoData: false
    }
  },
  mounted () {
    this.queryToYear(this.query.year)
  },
  methods: {
    maxYear () {
      let date = new Date().getFullYear()
      return date
    },
    // 根据年份查询养老保险
    queryToYear (year) {
      let params = api.getParam('F010.001.001', {aac001: window.localStorage['nowPersonNo'], aae036: year})
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        this.showNoData = false
        if (data.code === 0) {
          this.list = data.data.rows
          if (this.list.length < 1) {
            this.showNoData = true
          }
        } else {
          if (data.code === 500) {
            this.showNoData = true
            this.data = []
          } else {
            this.$vux.toast.text(data.msg, '')
          }
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    toDetail (id) {
      this.$router.push('/bxDetail/' + id)
    }
  }
}
</script>

<style scoped lang="less">
.yibaobaoxiao {
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
