import Vue from 'vue'
import Router from 'vue-router'
/** 社保**/
import socialSecurity from '@/page/socialSecurity'

/** 更多**/
import more from '@/page/more'

/** 首页**/
import index from '@/page/m_index'

/** 新闻详情**/
import news from '@/page/news'

/** 登记备案**/
import djba from '@/page/djba'

/** 登记备案确认**/
// import djbaqr from '@/page/djbaqr'

/** 培训补贴**/
import trainSubsidy from '@/page/trainSubsidy'

/** 生育补贴**/
import birthAllowance from '@/page/birthAllowance'

/** 复发登记**/
import recurRegistration from '@/page/recurRegistration'

/** 健康体检**/
import healthExamination from '@/page/examination/healthExamination'

/** 登陆**/
import login from '@/login'

/** 个人信息**/
import baseInfo from '@/page/baseInfo'

/** 养老账户**/
import yanglaozhanghu from '@/page/accountQuery/yanglaozhanghu'

/** 医保划账**/
import yibaohuazhang from '@/page/accountQuery/yibaohuazhang'

/** 应缴实缴查询**/
import yingjiaoshijiao from '@/page/accountQuery/yingjiaoshijiao'

/** 参保证明**/
import canbaozhengming from '@/page/accountQuery/canbaozhengming'

/** 注册**/
import register from '@/register'

/** 找回密码**/
import findPassword from '@/findPassword'

/** 灵活就业缴费**/
import linghuojiuyejiaofei from '@/page/pay/linghuojiuyejiaofei'

/** 有单缴费**/
import youdanjiaofei from '@/page/pay/youdanjiaofei'

/** 城居缴费**/
import chengjujiaofei from '@/page/pay/chengjujiaofei'

/** 我的**/
import mine from '@/page/mine/mine'

/** 设置**/
import setting from '@/page/mine/setting'

/** 个人账户单**/
import gerenzhanghudan from '@/page/accountQuery/gerenzhanghudan'

/** 医保卡**/
import yibaoka from '@/page/accountQuery/yibaoka'

/** 社保卡**/
import shebaoka from '@/page/accountQuery/shebaoka'

/** 医保报销**/
import yibaobaoxiao from '@/page/yibao/yibaobaoxiao'

/** 医保报销详情**/
import bxDetail from '@/page/yibao/bxDetail'

/** 本次费用分段计算明细**/
import fenduanjisuanmingxi from '@/page/yibao/fenduanjisuanmingxi'

/** 医疗费明细**/
import yiliaofeimingxi from '@/page/yibao/yiliaofeimingxi'

/** 既往费用**/
import jiwangfeiyong from '@/page/yibao/jiwangfeiyong'

/** 日结清单**/
import rijieqingdan from '@/page/yibao/rijieqingdan'

/** 日结清单明细**/
import rijieqingdanmingxi from '@/page/yibao/rijieqingdanmingxi'

/** 医院**/
import hospital from '@/page/zhenjianzhifu/hospital'

/** 科室**/
import keshi from '@/page/zhenjianzhifu/keshi'

/** 用户的缴费单列表**/
import jiaofeiliebiao from '@/page/pay/jiaofeiliebiao'

/** 门诊**/
import menzhen from '@/page/zhenjianzhifu/menzhen'

/** 挂号**/
import guahao from '@/page/zhenjianzhifu/guahao'

/** 待支付详情**/
import guahaoxiangqing from '@/page/zhenjianzhifu/guahaoxiangqing'

/** 就诊人**/
import jiuzhenren from '@/page/zhenjianzhifu/jiuzhenren'

/** 支付方式**/
import zhifufangshi from '@/page/zhenjianzhifu/zhifufangshi'

/** 发表评价**/
import comment from '@/page/zhenjianzhifu/comment'

/** 评价**/
import commentList from '@/page/zhenjianzhifu/commentList'

/** 预览pdf**/
// import PDFView from '@/components/PDFView'

/** 身份证实名认证**/
import idcardconfirm from '@/page/idcardconfirm'

/** 灵活就业养老参保登记**/
import ylcanbaodengji from '@/page/linghuojiuye/ylcanbaodengji'

/** 灵活就业医疗参保登记**/
import hospitalcanbaodengji from '@/page/linghuojiuye/hospitalcanbaodengji'

/** 灵活就业变更登记**/
import tingbaodengji from '@/page/linghuojiuye/tingbaodengji'

/** 灵活就业基本信息修改**/
import jibenxinxixiugai from '@/page/linghuojiuye/jibenxinxixiugai'

/** 工伤业务**/
import gongshang from '@/page/mine/gongshang'

/** 就业业务**/
import jiuye from '@/page/mine/jiuye'

/** 社保缴费**/
import shebaojiaofei from '@/page/mine/shebaojiaofei'

/** 生育**/
import shengyu from '@/page/mine/shengyu'

/** 医保**/
import yibao from '@/page/mine/yibao'

/** 养老服务**/
import yanglaofuwu from '@/page/mine/yanglaofuwu'

/** 失业补贴**/
import shiyebutie from '@/page/mine/shiyebutie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      component: index
    }, {
      path: '/socialSecurity',
      name: 'socialSecurity',
      component: socialSecurity,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/more',
      name: 'more',
      component: more,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/djba',
      name: 'djba',
      component: djba
    }, {
      path: '/trainSubsidy',
      name: 'trainSubsidy',
      component: trainSubsidy
    }, {
      path: '/birthAllowance',
      name: 'birthAllowance',
      component: birthAllowance
    }, {
      path: '/recurRegistration',
      name: 'recurRegistration',
      component: recurRegistration
    }, {
      path: '/healthExamination',
      name: 'healthExamination',
      component: healthExamination
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/baseInfo',
      name: 'baseInfo',
      component: baseInfo
    }, {
      path: '/yanglaozhanghu',
      name: 'yanglaozhanghu',
      component: yanglaozhanghu
    }, {
      path: '/yibaohuazhang',
      name: 'yibaohuazhang',
      component: yibaohuazhang
    }, {
      path: '/yingjiaoshijiao',
      name: 'yingjiaoshijiao',
      component: yingjiaoshijiao
    }, {
      path: '/register',
      name: 'register',
      component: register
    }, {
      path: '/findPassword',
      name: 'findPassword',
      component: findPassword
    }, {
      path: '/linghuojiuyejiaofei',
      name: 'linghuojiuyejiaofei',
      component: linghuojiuyejiaofei
    }, {
      path: '/news/:newsid',
      name: 'news',
      component: news
    }, {
      path: '/youdanjiaofei',
      name: 'youdanjiaofei',
      component: youdanjiaofei
    }, {
      path: '/jiaofeiliebiao',
      name: 'jiaofeiliebiao',
      component: jiaofeiliebiao
    }, {
      path: '/chengjujiaofei',
      name: 'chengjujiaofei',
      component: chengjujiaofei
    }, {
      path: '/mine',
      name: 'mine',
      component: mine
    }, {
      path: '/setting',
      name: 'setting',
      component: setting
    }, {
      path: '/gerenzhanghudan',
      name: 'gerenzhanghudan',
      component: gerenzhanghudan
    }, {
      path: '/yibaoka',
      name: 'yibaoka',
      component: yibaoka
    }, {
      path: '/shebaoka',
      name: 'shebaoka',
      component: shebaoka
    }, {
      path: '/yibaobaoxiao',
      name: 'yibaobaoxiao',
      component: yibaobaoxiao
    }, {
      path: '/bxDetail/:id',
      name: 'bxDetail',
      component: bxDetail
    }, {
      path: '/fenduanjisuanmingxi/:akc190/:aae072',
      name: 'fenduanjisuanmingxi',
      component: fenduanjisuanmingxi
    }, {
      path: '/yiliaofeimingxi/:akc190/:aae072',
      name: 'yiliaofeimingxi',
      component: yiliaofeimingxi
    }, {
      path: '/jiwangfeiyong/:akc190',
      name: 'jiwangfeiyong',
      component: jiwangfeiyong
    }, {
      path: '/rijieqingdan/:akc190/:aae072',
      name: 'rijieqingdan',
      component: rijieqingdan
    }, {
      path: '/rijieqingdanmingxi/:akc190/:aae072/:date',
      name: 'rijieqingdanmingxi',
      component: rijieqingdanmingxi
    }, {
      path: '/hospital',
      name: 'hospital',
      component: hospital
    }, {
      path: '/keshi/:orgCode',
      name: 'keshi',
      component: keshi
    }, {
      path: '/menzhen/:orgCode',
      name: 'menzhen',
      component: menzhen
    }, {
      path: '/guahao/:orgCode',
      name: 'guahao',
      component: guahao
    }, {
      path: '/jiuzhenren',
      name: 'jiuzhenren',
      component: jiuzhenren
    }, {
      path: '/zhifufangshi',
      name: 'zhifufangshi',
      component: zhifufangshi
    }, {
      path: '/guahaoxiangqing/:orderId',
      name: 'guahaoxiangqing',
      component: guahaoxiangqing
    }, {
      path: '/comment',
      name: 'comment',
      component: comment
    }, {
      path: '/commentList',
      name: 'commentList',
      component: commentList
    }, {
      path: '/canbaozhengming',
      name: 'canbaozhengming',
      component: canbaozhengming
    }, {
      path: '/idcardconfirm',
      name: 'idcardconfirm',
      component: idcardconfirm
    }, {
      path: '/ylcanbaodengji',
      name: 'ylcanbaodengji',
      component: ylcanbaodengji
    }, {
      path: '/hospitalcanbaodengji',
      name: 'hospitalcanbaodengji',
      component: hospitalcanbaodengji
    }, {
      path: '/tingbaodengji',
      name: 'tingbaodengji',
      component: tingbaodengji
    }, {
      path: '/jibenxinxixiugai',
      name: 'jibenxinxixiugai',
      component: jibenxinxixiugai
    }, {
      path: '/gongshang',
      name: 'gongshang',
      component: gongshang
    }, {
      path: '/jiuye',
      name: 'jiuye',
      component: jiuye
    }, {
      path: '/shebaojiaofei',
      name: 'shebaojiaofei',
      component: shebaojiaofei
    }, {
      path: '/shengyu',
      name: 'shengyu',
      component: shengyu
    }, {
      path: '/yibao',
      name: 'yibao',
      component: yibao
    }, {
      path: '/yanglaofuwu',
      name: 'yanglaofuwu',
      component: yanglaofuwu
    }, {
      path: '/shiyebutie',
      name: 'shiyebutie',
      component: shiyebutie
    }
  ]
})
