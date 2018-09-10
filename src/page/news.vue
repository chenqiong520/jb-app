<template>
  <div class="news">
    <x-header :left-options="{backText: ''}">新闻内容</x-header>
    <!-- <img :src="baseInfo.src" style="padding: 10px;
           width:90%;">
     </img>-->
      <div>
        <div class="title">{{baseInfo.title}}
        </div>
        <div class="auth">{{baseInfo.author}}  {{baseInfo.lasttime}}</div>
        <div class="content"  v-html="baseInfo.content">
        </div>
        <div class="clicks">阅读 <span class="read_num">{{baseInfo.clicks}}</span></div>
      </div>
  </div>
</template>

<script>
import api from '../router/api'
import { XHeader } from 'vux'
export default {
  name: 'news',
  components: {XHeader},
  data () {
    return {
      src: 'http://o5omsejde.qnssl.com/demo/test2.jpg',
      baseInfo: {
        /* title: 'sdfkjajsdlfjlaksjdfl',
        src: 'https://o5omsejde.qnssl.com/demo/test6.jpg',
        author: '李嘉',
        createtime: '2018-06-28',
        content: '<p>dfasdfasdfasdfsdfkajsd<br>lfkjklasjdfl</p>',
        personImg: '' */
      },
      value1: []
    }
  },
  mounted () {
    if (this.$route.params.newsid && this.$route.params.newsid !== 'undefined') {
      this.loadBaseInfo()
    }
  },
  methods: {
    loadBaseInfo () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('Q009.010.002', {'newsid': this.$route.params.newsid})
      api.postData(this, params, window.localStorage['token']).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.baseInfo = data.data
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

<style lang="less">
  .news {
    font-family: 微软雅黑;

  .title {
    text-align: left;
    margin-top: 3pt;
    padding: 12pt;
    font-size: 18pt;
    display: block;
    word-break: break-all;
    word-wrap: break-word;
  }

  .auth {
    padding: 12pt;
    color: #9b9b9b;
    background-color: white;
    text-align: left;
    font-size: 12pt;
    display: block;
    word-break: break-all;
    word-wrap: break-word;
  }

  .content {
    padding-top: 5pt;
    padding: 12pt;
    font-size: 12pt;
    background-color: white;
    text-align: left;
    /*font-size: 12pt;*/
    display: block;
    word-break: break-all;
    word-wrap: break-word;
    img {
      max-width: 100%;
    }
    /*p{
      text-indent:2em
    }*/

  }

  .clicks{
    font-size: 12pt;
    padding-top: 20pt;
    padding: 10pt;
    background-color: white;
    text-align: left;
  }

  .next_btn {
    margin: 15px auto;
  }
  .read_num {
    color: #ff4200;
  }
  }
</style>
