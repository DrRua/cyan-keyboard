<template>

  <div class="setting-box">
    <h3 class="h3-title">绑定鼠标连点</h3>
    <div class="key-box">
      <div class="key ctrl-key">Ctrl</div>
      <div class="add">+</div>
      <div class="key space-key">Alt</div>
      <div class="add">+</div>
      <div class="key input-key">
        {{ state.key }}
      </div>
    </div>
    <CyanInput
      v-model="state.timeout"
      label="间隔时间（毫秒）"
      type="number"
      color="#7adaff"
    />
    <div class="tools-box">
      <div
        class="bind-button"
        @click="sendKey(true)"
      >绑定</div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import message from '@/utils/message'

const state = reactive({
  isLock: false,
  key: 'P',
  timeout: 200,
  inputStr: '',
  testInput: '',
})
// 发送绑定信息
const sendKey = () => {
  window.$electron.sendMsg({
    handler: 'mouseClick',
    timeout: state.timeout,
  })
}
// 接收绑定消息
window.$electron.onMessage('mouseClick', (e, arg) => {
  if (arg.msg) message.success('绑定成功！')
  else message.error('绑定失败！')
})
</script>

<style lang="scss" scoped>
@import './setting.scss'
</style>