<template>
  <div
    :class="[props.theme, props.isShrink ? 'shrink' : '']"
    class="menu-box"
  >
    <TheSvg />
    <div class="sidebar-wrapper">
      <div class="sidebar-themeContainer">
        <label class="sidebar-themeLabel">
          <div
            v-show="!props.isShrink || props.theme !== 'light'"
            class="sidebar-themeType light"
            @click="changeTheme('light')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="sidebar-listIcon"
            >
              <circle
                cx="12"
                cy="12"
                r="5"
              ></circle>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
            </svg>
          </div>
          <div
            v-show="!props.isShrink || props.theme !== 'dark'"
            class="sidebar-themeType dark"
            @click="changeTheme('dark')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="sidebar-listIcon"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
        </label>
      </div>
      <ul class="sidebar-list">
        <li
          v-for="menu in state.menuList"
          :key="menu.path"
          class="sidebar-item"
          @click="routerLink(menu)"
        >
          <div
            :class="route.path === menu.path ? 'active' : ''"
            class="item-box"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="sidebar-listIcon"
            >
              <use :xlink:href="`#${menu.icon}`" fill="var(--menu-text-color)"></use>
            </svg>
            <span class="menu-label">{{ menu.label }}</span>
          </div>
        </li>
      </ul>
      <div
        class="sidebar-profile"
        @click="changeMenu"
      >
        <svg
          t="1648203542106"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9886"
          width="20"
          height="20"
        >
          <path
            d="M109.3 672v95c0 78.7 63.8 142.5 142.5 142.5h95c78.7 0 142.5-63.8 142.5-142.5V529.5H251.8c-78.7 0-142.5 63.8-142.5 142.5z m304 95c0 36.7-29.8 66.5-66.5 66.5h-95c-36.7 0-66.5-29.8-66.5-66.5v-95c0-36.7 29.8-66.5 66.5-66.5h161.5V767zM346.8 114.5h-95c-78.7 0-142.5 63.8-142.5 142.5v95c0 78.7 63.8 142.5 142.5 142.5h237.5V257c0-78.7-63.8-142.5-142.5-142.5z m66.5 304H251.8c-36.7 0-66.5-29.8-66.5-66.5v-95c0-36.7 29.8-66.5 66.5-66.5h95c36.7 0 66.5 29.8 66.5 66.5v161.5zM772.3 529.5H534.8V767c0 78.7 63.8 142.5 142.5 142.5h95c78.7 0 142.5-63.8 142.5-142.5v-95c0-78.7-63.8-142.5-142.5-142.5zM838.8 767c0 36.7-29.8 66.5-66.5 66.5h-95c-36.7 0-66.5-29.8-66.5-66.5V605.5h161.5c36.7 0 66.5 29.8 66.5 66.5v95z"
            fill="#4A5FE2"
            p-id="9887"
          ></path>
          <path
            d="M724.8 194.5c29.4 0 57 11.4 77.8 32.2s32.2 48.4 32.2 77.8-11.4 57-32.2 77.8-48.4 32.2-77.8 32.2-57-11.4-77.8-32.2-32.2-48.4-32.2-77.8 11.4-57 32.2-77.8c20.7-20.8 48.4-32.2 77.8-32.2m0-80c-104.9 0-190 85.1-190 190s85.1 190 190 190 190-85.1 190-190-85.1-190-190-190z"
            fill="#7C44E2"
            p-id="9888"
          ></path>
        </svg>
        <span class="text">
          Mocan
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TheSvg from './TheSvg.vue'

const route = useRoute()
const router = useRouter()
const state = reactive({
  menuList: [
    { path: '/index', svg: '', label: '首页', icon: 'svg-menu-home' },
    { path: '/count', svg: '', label: '统计', icon: 'svg-menu-count' },
    { path: '/setting', svg: '', label: '设置', icon: 'svg-menu-setting' },
    { path: '/about', svg: '', label: '关于', icon: 'svg-menu-manage' },
  ]
})
const props = defineProps({
  isShrink: { type: Boolean, default: false },
  theme: { type: String, default: 'dark' }
})
const emits = defineEmits(['update:theme', 'update:isShrink'])

const changeTheme = (type) => {
  emits('update:theme', type)
}

const routerLink = (menu) => {
  router.push({ path: menu.path })
}

const changeMenu = () => {
  const value = !props.isShrink
  emits('update:isShrink', value)
}

</script>

<style lang="scss" scoped>
@import './menu.scss';
</style>
