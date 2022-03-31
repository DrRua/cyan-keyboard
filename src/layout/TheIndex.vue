<template>
  <div
    :style="{
      '--theme-color': state.theme === 'light' ? '#1b1e2be6' : '#11121e',
      '--body-bg-color': state.theme === 'light' ? '#f5f4fd' : '#00071d',
    }"
    :data-theme="state.theme"
    class="layout-content"
  >
    <TheHeader />
    <TheMenu v-model:theme="state.theme" v-model:isShrink="state.isShrink" />
    <div
      :style="{
        'padding-left': state.isShrink ? '90px' : '200px'
      }"
      class="layout-body"
    >
      <slot name="default" />
    </div>
    <canvas id="canvas-blog" />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import TheHeader from './header/TheHeader.vue'
import TheMenu from './menu/TheMenu.vue'
import { mainInit } from '@/utils/background'

const state = reactive({
  isShrink: false,
  theme: 'dark'
})

onMounted(() => {
  mainInit()
})

</script>

<style lang="scss" scoped>
.layout-content {

  --header-height: 34px;
  --theme-color: #1b1e2be6;
  --body-bg-color: #f5f4fd;
  --menu-bg-color: #191c24f5;
  
  --menu-hover-color: #f9f8fb; // 菜单项鼠标移入背景色
  --main-container-bg: #fff; // 菜单栏背景色
  --menu-text-color: #00071d; // 主题文字颜色
  --main-bg-color: #e6e9eb; // 菜单项背景色

  --menu-z: 1;
  --bg-z: 1;
  --pop-z: 10;

  position: relative;
  height: 100%;
  width: 100%;
  font-family: KaiTi, sans-serif, monospace;

  ::v-deep(.layout-body) {
    .title {
      font-family: wanju, Kaiti;
      padding: 10px 0 0 20px;
    }
  }
  &[data-theme='light'] {
    ::v-deep(div) {
      .title, .date-input, .button, .key {
        color: var(--menu-text-color);
      }
    }
  }
  &[data-theme='dark'] {
    ::v-deep(div) {
      .title, .date-input, .button, .key {
        color: #FFF;
      }
    }
  }

  .layout-body {
    height: calc(100% - var(--header-height));
    background-color: var(--body-bg-color);
    overflow: auto;
    transition: background .3s ease-in-out, padding .3s ease-in-out;
  }

  #canvas-blog {
    z-index: var(--bg-z);
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>