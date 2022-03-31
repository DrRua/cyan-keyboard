<template>
  <div class="setting-page">
    <h1 class="title">设置</h1>
    <div class="setting-box">
      <h3 class="h3-title">绑定快捷键</h3>
      <div class="key-box">
        <div class="key ctrl-key">Ctrl</div>
        <div class="add">+</div>
        <div class="key space-key">Alt</div>
        <div class="add">+</div>
        <div class="key input-key bind-key">
          <input
            ref="keyInputRef"
            v-model="state.key"
            readonly
            type="text"
            placeholder="请按下绑定键"
          />
          <span
            class="lock-icon"
            @click="state.isLock = !state.isLock"
          >
            {{ state.isLock ? '🔒' : '🔓' }}</span>
        </div>
      </div>
      <CyanInput
        v-model="state.timeout"
        label="间隔时间（毫秒）"
        type="number"
        color="#7adaff"
      />
      <CyanInput
        v-model="state.inputStr"
        label="输入字符串"
        color="#7adaff"
      />
      <div class="tools-box">
        <div
          class="bind-button"
          @click="sendKey(true)"
        >绑定</div>
        <div
          class="bind-button"
          @click="sendKey(false)"
        >取消绑定</div>
        <div
          class="bind-button"
          @click="showBind"
        >查看绑定信息</div>
        <div
          class="bind-button"
          @click="unBindAll"
        >取消所有绑定</div>
      </div>
      <div class="test-input">
        <CyanInput
          v-model="state.testInput"
          label="测试输入框"
          color="#7adaff"
        />
      </div>
    </div>
    <SettingMouse />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onDeactivated, onActivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import message from '@/utils/message'
import SettingMouse from './SettingMouse.vue'

const router = useRouter()
const route = useRoute()
const state = reactive({
  isLock: false,
  key: '',
  timeout: 200,
  inputStr: '',
  testInput: '',
})
const keyInputRef = ref(null)

// 填写绑定的键名
const bindKey = (e) => {
  if (state.isLock) return
  if (!/^[a-z0-9A-Z]{1}$/i.test(e.key)) {
    message.warning('按键不合法！')
    return
  }
  const key = e.key
  state.key = key
}

// 监听键盘
const listenerKey = () => {
  if (keyInputRef.value) keyInputRef.value.addEventListener('keydown', bindKey)
}
const removeListenerKey = () => {
  if (keyInputRef.value) keyInputRef.value.removeEventListener('keydown', bindKey)
}
onMounted(() => {
  listenerKey()
})

// 发送绑定信息
const sendKey = (flag) => {
  if (!state.key) {
    message.warning('请绑定按键！')
    return
  }
  if (!state.inputStr && flag) {
    message.warning('请输入绑定字符串！')
    return
  }
  if (flag && !/^[a-z0-9]+$/ig.test(state.inputStr)) {
    message.warning('请输入字母和数字！')
    return
  }
  const handlerName = flag ? 'bindKey' : 'unBindKey'
  window.$electron.sendMsg({
    handler: handlerName,
    key: state.key,
    input: state.inputStr,
    timeout: state.timeout,
  })
}
// 接收绑定消息
window.$electron.onMessage('bindKey', (e, arg) => {
  if (arg.msg) message.success('绑定成功！')
  else message.error('绑定失败！')
})
window.$electron.onMessage('unBindKey', () => message.success('取消绑定成功！'))

// 获取存储的绑定信息
const getBindInfo = () => {
  window.$electron.sendMsg({ handler: 'getBindKey' })
}
window.$electron.onMessage('getBindKey', (e, arg) => {
  const data = arg.msg?.[0]
  if (data) {
    state.key = data.key
    state.timeout = data.timeout
    state.inputStr = data.input
  }
})
getBindInfo()

// 查看绑定信息
const showBind = () => router.push({ name: 'Index' })
// 取消所有绑定
const unBindAll = () => {
  window.$electron.sendMsg({ handler: 'unBindKeyAll' })
}
window.$electron.onMessage('unBindKeyAll', () => {
  message.success('取消绑定成功！')
})

onActivated(() => {
  listenerKey()
  const params = route.params
  if (params && params.key) {
    state.key = params.key
    state.timeout = params.timeout
    state.inputStr = params.input
  }
})

onDeactivated(() => {
  removeListenerKey()
})

</script>

<style lang="scss" scoped>
@import './setting.scss';
</style>