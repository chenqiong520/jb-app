<template>
  <div class="hospital">
    <x-header :left-options="{backText: ''}">医院</x-header>
        <div >
          <search
          class="search"
          v-model="orgName"
          position="absolute"
          placeholder="输入医院"
          top="46px"
          ref="search"
          @on-submit="getList"
          @on-clear="getList">
        </search>
        </div>
        <tab active-color="#0084ff" :line-width="2">
          <tab-item selected @on-item-click="onItemClick">评价等级</tab-item>
          <tab-item @on-item-click="onItemClick">挂号量</tab-item>
          <tab-item @on-item-click="onItemClick">距离</tab-item>
          <tab-item @on-item-click="onItemClick">筛选</tab-item>
        </tab>
        <div>

        </div>
        <div class="con_wrapper">
          <flexbox class="item_con" @click.native="hospitalDetail(item.orgCode)" v-for="(item, i) in list" :key="i">
            <flexbox-item class="left_con">
              <img class="hos_img" src="../../assets/hospital.png"/>
              <div class="text_wrapper">
                <div class="titl">{{item.orgName}}</div>
                <div class="desc"><span class="ff">4.8分</span><span>就诊量{{item.numVisits}}</span></div>
                <div class="desc"><span class="ff">综合医院</span><span>{{item.hospitalGrade}}</span></div>
                <div class="address"><img class="addr_icon" src="../../assets/addr.png" />{{item.address}}</div>
              </div>
            </flexbox-item>
            <flexbox-item :span="1" class="right_con">
              <div>300m</div>
            </flexbox-item>
          </flexbox>
        </div>
  </div>
</template>

<script>
import {XHeader, Tab, TabItem, Flexbox, FlexboxItem, Search} from 'vux'
import api from '../../router/api'
export default {
  name: 'hospital',
  components: {XHeader, Tab, TabItem, Flexbox, FlexboxItem, Search},
  data () {
    return {
      list: [],
      orgName: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取医院列表
    getList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Z001.001.001', {orgName: this.orgName})
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
    onItemClick () {},
    hospitalDetail (code) {
      this.$router.push('/keshi/' + code)
    }
  }
}
</script>

<style lang="less">
  .vux-search-box.search {
    position: relative!important;
    top: 0!important;
    .weui-search-bar__box .weui-search-bar__input {
      height: 28px;
    }
    .weui-search-bar__label{
      line-height: 26px;
    }
    .weui-search-bar__cancel-btn, .weui-icon-search {
      line-height: 36px;
    }
    .weui-search-bar__box .weui-icon-clear {
      line-height: 36px;
    }
  }
  .hospital {
    .query_input {
      width: 100%;
      height: 35px;
     border-radius: 4px;
      padding: 0 10px;
      box-sizing: border-box;
      border: none;
      font-size: 15px;
    }
    .con_wrapper {
      background-color: #fff;
      padding: 0 15px;
      .item_con {
        padding: 15px 0;
        border-bottom: 1px solid #ebebeb;
        .left_con {
          white-space: nowrap;
          .hos_img {
            width: 110px;
            height: 83px;
            vertical-align: top;
          }
          .text_wrapper {
            margin-left: 10px;
            .titl {
              font-size: 15px;
              margin-bottom: 10px;
              line-height: 15px;
            }
            .desc {
              font-size: 12px;
              line-height: 12px;
              color: #a3a7a7;
              margin-bottom: 10px;
              .ff {
                display: inline-block;
                margin-right: 10px;
              }
            }
            .address {
              .addr_icon {
                width: 8px;
                height: 10px;
                margin-right: 5px;
              }
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 12px;
              line-height: 12px;
              color: #a3a7a7;
            }
            display: inline-block;
            max-width: calc(~"100% - 120px");
          }
        }
        .right_con {
          margin-left: 0!important;
          flex: 0 0 12%!important;
          text-align: right;
          color: #fea700;
        }
      }
    }
  }
</style>
