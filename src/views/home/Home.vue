<template>
  <div class="home-page">
    <h1 class="title">键盘校验</h1>
    <div class="keyboard">
      <div
        class="key s2 esc"
        data-key="`"
      >~</div>
      <div
        class="key"
        on-shift="!"
        data-key="1"
      >1</div>
      <div
        class="key"
        on-shift="@"
        data-key="2"
      >2</div>
      <div
        class="key"
        on-shift="#"
        data-key="3"
      >3</div>
      <div
        class="key"
        on-shift="$"
        data-key="4"
      >4</div>
      <div
        class="key"
        on-shift="%"
        data-key="5"
      >5</div>
      <div
        class="key"
        on-shift="^"
        data-key="6"
      >6</div>
      <div
        class="key"
        on-shift="&amp;"
        data-key="7"
      >7</div>
      <div
        class="key"
        on-shift="*"
        data-key="8"
      >8</div>
      <div
        class="key"
        on-shift="("
        data-key="9"
      >9</div>
      <div
        class="key"
        on-shift=")"
        data-key="0"
      >0</div>
      <div
        class="key sub"
        on-shift="_"
        data-key="-"
      >-</div>
      <div
        class="key add"
        on-shift="+"
        data-key="="
      >=</div>
      <div
        class="key s4 back"
        data-key="Backspace"
      >←</div>
      <div
        class="key s3 tab"
        data-key="Tab"
      >Tab</div>
      <div
        class="key"
        data-key="Q"
      >Q</div>
      <div
        class="key"
        data-key="W"
      >W</div>
      <div
        class="key"
        data-key="E"
      >E</div>
      <div
        class="key"
        data-key="R"
      >R</div>
      <div
        class="key"
        data-key="T"
      >T</div>
      <div
        class="key"
        data-key="Y"
      >Y</div>
      <div
        class="key"
        data-key="U"
      >U</div>
      <div
        class="key"
        data-key="I"
      >I</div>
      <div
        class="key"
        data-key="O"
      >O</div>
      <div
        class="key"
        data-key="P"
      >P</div>
      <div
        class="key openbracket"
        on-shift="{"
        data-key="["
      >[</div>
      <div
        class="key closebracket"
        on-shift="}"
        data-key="]"
      >]</div>
      <div
        class="key s3 pipe"
        on-shift="|"
        data-key="|"
      >\</div>
      <div
        ref="capRef"
        class="key s4 cap"
        data-key="CapsLock"
      >🔓</div>
      <div
        class="key"
        data-key="A"
      >A</div>
      <div
        class="key"
        data-key="S"
      >S</div>
      <div
        class="key"
        data-key="D"
      >D</div>
      <div
        class="key dotted"
        data-key="F"
      >F</div>
      <div
        class="key"
        data-key="G"
      >G</div>
      <div
        class="key"
        data-key="H"
      >H</div>
      <div
        class="key dotted"
        data-key="J"
      >J</div>
      <div
        class="key"
        data-key="K"
      >K</div>
      <div
        class="key"
        data-key="L"
      >L</div>
      <div
        class="key semi"
        on-shift=":"
        data-key=";"
      >;</div>
      <div
        class="key comma"
        on-shift="&quot;"
        data-key=","
      >,</div>
      <div
        class="key s4 enter"
        data-key="Enter"
      >Enter</div>
      <div
        class="key s5 shift"
        data-key="💪"
      >Shift</div>
      <div
        class="key"
        data-key="Z"
      >Z</div>
      <div
        class="key"
        data-key="X"
      >X</div>
      <div
        class="key"
        data-key="C"
      >C</div>
      <div
        class="key"
        data-key="V"
      >V</div>
      <div
        class="key"
        data-key="B"
      >B</div>
      <div
        class="key"
        data-key="N"
      >N</div>
      <div
        class="key"
        data-key="M"
      >M</div>
      <div
        class="key openangular"
        on-shift="&lt;"
        data-key=","
      >,</div>
      <div
        class="key closeangular"
        on-shift="&gt;"
        data-key="."
      >.</div>
      <div
        class="key slash"
        on-shift="?"
        data-key="/"
      >/</div>
      <div
        class="key s5 shift up"
        data-key="Shift"
      >Shift</div>
      <div
        class="key s3 control"
        data-key="Ctrl"
      >Ctrl</div>
      <div
        class="key s3 win"
        data-key="win"
      >❤</div>
      <div
        class="key s3 alt"
        data-key="Alt"
      >Alt</div>
      <div
        class="key s12 space"
        data-key="Space"
      ></div>
      <div
        class="key s3 alt"
        data-key="Alt"
      >Alt</div>
      <div
        class="key s2 fn left"
        data-key="win"
      >♥</div>
      <div
        class="key s2 fn down"
        data-key="Ctrl"
      >Ctrl</div>
    </div>
    <h1 class="title">绑定快捷键</h1>
    <ul
      v-show="state.keyBindList.length"
      class="key-bind-list">
      <li
        v-for="key in state.keyBindList"
        :key="key.key"
        class="key-bind-item"
      >
        <div class="key bind-key">Ctrl + Alt + {{ key.key }}</div>
        <div class="key bind-key">{{ key.input }}</div>
        <div class="key bind-key time-key">{{ key.timeout }}</div>
        <div
          class="bind-button"
          @click="showBind(key)"
        >修改绑定</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({
  keyBindList: []
})

onMounted(() => {
  getBindInfo()
  const keys = document.querySelectorAll('.key')
  keys.forEach((k) => k.addEventListener('transitionend', unPress))
})

function unPress (e) {
  if (e.propertyName === 'transform') this.classList.remove('pressed')
}

// 接收消息
window.$electron.onMessage('keydown', (event, arg) => {
  handleKeyDown(arg, 'keydown')
})
window.$electron.onMessage('keyup', (event, arg) => {
  handleKeyDown(arg, 'keyup')
})

const capRef = ref(null)

const handleKeyDown = (e, type) => {
  const handler = type === 'keydown' ? 'add' : 'remove'
  const target = `.key[data-key="${e.keyName}"]`
  const key = document.querySelector(target)
  key && key.classList[handler]('pressed')
}

// 获取存储的绑定信息
const getBindInfo = () => {
  window.$electron.sendMsg({ handler: 'getBindKey' })
}
window.$electron.onMessage('getBindKey', (e, arg) => {
  const data = arg.msg || []
  state.keyBindList = data
})
getBindInfo()

// 修改绑定快捷键
const showBind = (info) => {
  router.push({ name: 'Setting', params: { ...info } })
}

onActivated(() => {
  getBindInfo()
})

</script>

<style lang="scss" scoped>
@import './home.scss';
</style>