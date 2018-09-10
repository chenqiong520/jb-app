<template>
  <div class="more">
    <x-header :left-options="{backText: ''}">全部</x-header>
    <div class="slider" ref="slider" v-if="false">
      <div class="topMenu" ref="menu">
        <div class="item" :class="i === activeIndex? 'active' : ''" v-for="(item,i) in list" :key="i">{{item}}</div>
      </div>
    </div>
    <div class="main_content_wrapper" ref="content">
      <div>
        <div v-for="(row , i) in menuList" :key="i">
          <div v-if="row.childList.length > 0">
            <div class="title" :class="i === 0? 'first': ''">
              <span>{{row.nodename}}</span>
            </div>
            <grid class="content_wrap" :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">

              <grid-item class="item"  :link="childItem.nodeurl" :label="childItem.nodename" v-for="(childItem, j) in row.childList" :key="j">
                <img slot="icon"  :src="childItem.photopath"/>
              </grid-item>
            </grid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, XCircle, Grid, GridItem, Flexbox, FlexboxItem} from 'vux'
import menuData from '../router/menuData'
import BScroll from 'better-scroll'
export default {
  name: 'socialSecurity',
  components: {XHeader, XCircle, Grid, GridItem, Flexbox, FlexboxItem},
  data () {
    return {
      activeIndex: 0,
      list: ['社保缴费', '失业待遇', '个人查询', '灵活就业', '工伤申报', '退休人员'],
      menuList: menuData.menuList
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.scroll) {
        if (from.name === 'socialSecurity') {
          vm.scroll.scrollTo(0, 0, 500)
        } else {
          vm.scroll.refresh()
        }
      }
    })
  },
  mounted () {
    setTimeout(this._initScroll(), 3000)
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.content, {
          click: true
        })
      })
    }
  }
}
</script>

<style lang="less">
  .more {
    margin-bottom: 24px;
    .main_content_wrapper {
     top:46px;
    }
    .first {
      margin-top: 0;
    }
    .content_wrap {
      background-color: #fff;
      .weui-grid:after {
        border-bottom: none;
      }
    }
    .item {
      text-align: center;
      .weui-grid__icon {
        display: inline-block;
        width: 32px;
        height: 32px;
      }
      .weui-grid__label {
        font-size: 13px;
        color: #333;
      }
    }
    .slider {
      width: 100%;
      background-color: #fff;
      height: 45px;
      position: fixed;
      z-index: 50;
      line-height: 45px;
      border-bottom: 1px solid #efefef;
    }
    .topMenu {
      white-space: nowrap;
      .item {
        display: inline-block;
        margin: 0 9px;
      }
      .active {
        color: #0084ff;
      }
    }
  }
</style>
