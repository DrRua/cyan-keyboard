<template>
  <header>
    <div class="menu-bar">
      <div class="app-logo" />
      <div
        class="menu-item"
        @click="toggleMenu('setting')"
        @mouseenter="moveMenu('setting')"
      >
        <span class="menu-label">文件</span>
        <ul
          v-show="state.menuShow.setting"
          class="menu-pop-list"
        >
          <li
            class="pop-item"
            @click="menuClick($event, 'getStorePath')"
          >存储路径</li>
          <li
            class="pop-item"
            @click="menuClick($event, 'closeWin')"
          >关闭</li>
          <li
            class="pop-item"
            @click="menuClick($event, 'exitApp')"
          >退出</li>
        </ul>
      </div>
      <div
        class="menu-item"
        @click="toggleMenu('help')"
        @mouseenter="moveMenu('help')"
      >
        <span class="menu-label">帮助</span>
        <ul
          v-show="state.menuShow.help"
          class="menu-pop-list"
        >
          <li
            class="pop-item"
            @click="menuClick($event, 'checkUpdate')"
          >检查更新</li>
          <li
            class="pop-item"
            @click="menuClick($event, 'showAbout')"
          >关于</li>
        </ul>
      </div>
    </div>
    <div class="space-div">{{ route.meta.title }}</div>
    <TheTools ref="TheToolsRef" />
  </header>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import TheTools from './TheTools.vue'
import message from '@/utils/message'

const TheToolsRef = ref(null)
const route = useRoute()
const state = reactive({
  menuShow: {
    setting: false,
    help: false
  },
  menu: {
  }
})
const curMenu = []

// 切换下拉菜单显示
const toggleMenu = (menu) => {
  state.menuShow[menu] = !state.menuShow[menu]
  if (!state.menuShow[menu]) return
  if (curMenu.length === 0) {
    curMenu.push(menu)
  } else {
    closeMenu()
    curMenu.push(menu)
  }
  menuClickListener()
}

const moveMenu = (type) => {
  if (curMenu.length) {
    curMenu.forEach(item => state.menuShow[item] = false)
    curMenu.length = 0
    curMenu.push(type)
    state.menuShow[type] = true
  }
}

// 监听鼠标事件关闭菜单
const menuClickListener = () => {
  setTimeout(() => {
    window.addEventListener('click', closeMenu)
    window.addEventListener('contextmenu', closeMenu)
  }, 20)
}

// 关闭菜单、清除监听事件
const closeMenu = () => {
  curMenu.forEach(item => state.menuShow[item] = false)
  curMenu.length = 0
  window.removeEventListener('click', closeMenu)
  window.removeEventListener('contextmenu', closeMenu)
}

// 菜单点击事件
const menuClick = (e, arg) => {
  e.stopPropagation()
  const type = arg
  if (!type) return
  switch (type) {
    case 'checkUpdate': message.error('功能还未实现o(╥﹏╥)o')
      break
    default: window.$electron.sendMsg({ handler: type })
  }
  closeMenu()
}

window.$electron.onMessage('getStorePath', (e, arg) => {
  const path = arg.msg
  message.success(path)
})
window.$electron.onMessage('winMove', () => closeMenu())
window.$electron.onMessage('maxScreen', () => closeMenu())
window.$electron.onMessage('minScreen', () => closeMenu())

</script>

<style lang="scss" scoped>
header {
  -webkit-app-region: drag;

  height: var(--header-height);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: var(--theme-color);
  user-select: none;
}

.menu-bar {
  -webkit-app-region: no-drag;

  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .app-logo {
    -webkit-app-region: drag;
    height: 100%;
    line-height: var(--header-height);
    background-image: url(../../assets/mocan.ico);
    width: 30px;
    background-position: center;
    background-size: contain;
    margin: 0 10px 0 6px;
    background-repeat: no-repeat;
  }

  .menu-item {
    --menu-hover-color: #7eb1fe;
    position: relative;
    height: 100%;
    padding: 0 20px 0 4px;
    line-height: var(--header-height);
    text-align: center;
    font-size: 12px;
    color: #babed9;
    cursor: pointer;

    &:hover .menu-label {
      color: var(--menu-hover-color);
    }

    .menu-pop-list {
      z-index: var(--pop-z);
      position: absolute;
      top: calc(100% - 1px);
      width: 120px;
      left: 0;
      padding: 8px 0;
      border-radius: 2px;
      background-color: var(--menu-bg-color);

      .pop-item {
        padding: 0 20px;
        text-align: left;
        line-height: 32px;
        cursor: pointer;
        &:hover {
          color: var(--menu-hover-color);
          background-color: #262d37;
        }
      }
    }
  }
}

.space-div {
  flex: 1;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: var(--header-height);
}
</style>