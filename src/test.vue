<template>
  <div>
    <drag-verify
      :width="width"
      :height="height"
      :text="text"
      :success-text="successText"
      :background="background"
      :progress-bar-bg="progressBarBg"
      :completed-bg="completedBg"
      :handler-bg="handlerBg"
      :handler-icon="handlerIcon"
      :text-size="textSize"
      :success-icon="successIcon"
      @passcallback="passVerify"
    >
    </drag-verify>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import dragVerify from 'vue-drag-verify'
export default {
  name: 'test',
  components: {dragVerify},
  data () {
    return {
      handlerIcon: 'fa fa-angle-double-right',
      successIcon: 'fa fa-check',
      background: '#cccccc',
      progressBarBg: '#FFFF99',
      completedBg: '#66cc66',
      handlerBg: '#fff',
      text: '请将滑块拖动到右侧',
      successText: '验证成功',
      width: 320,
      height: 42,
      textSize: '18px',
      isCircle: 'true'
    }
  },
  mounted () {
  },
  methods: {
    passVerify () {
      console.log(this.$refs.Verify.isMoving)
      console.log(this.$refs.Verify.isPassing)
    }
  }
}

</script>

<style scoped>
</style>
