<template>
  <div class="count-page">
    <div class="top-line tool-line">
      <h1 class="title">统计信息</h1>
      <div
        class="refresh-button button"
        @click="refresh"
      >刷新</div>
    </div>
    <div class="count-box">
      <TotalChart :data="state.keyData" />
    </div>
    <div class="count-box">
      <DateChart :data="state.keyData" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import TotalChart from './TotalChart.vue'
import DateChart from './DateChart.vue'

const state = reactive({
  keyData: {}
})
onMounted(() => {
  getData()
})

const refresh = () => {
  window.$electron.sendMsg({ handler: 'winReload' })
}

const getData = () => {
  window.$electron.sendMsg({ handler: 'getStoreData' })
}

// 接收消息
window.$electron.onMessage('getStoreData', (event, arg) => {
  const data = arg.msg || {}
  state.keyData = data
})
</script>

<style lang="scss" scoped>
.count-page {
  .count-box {
    padding: 10px 20px;
    color: #7adaff;
  }

  .count-box + .count-box {
    margin-top: 24px;
  }

  .top-line,
  ::v-deep(.top-line) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .h3-title {
      font-family: wanju, KaiTi, sans-serif;
    }
    .date-input {
      width: 80px;
      border: none;
      outline: none;
      background: none;
      text-align: right;
      cursor: pointer;
    }

    &.tool-line {
      margin-right: 20px;
      align-items: flex-end;
    }
  }

  .refresh-button {
    padding: 4px 18px;
    border: 2px solid #7adaff;
    border-radius: 16px;
    font-family: wanju, KaiTi, sans-serif;
    cursor: pointer;

    &:hover {
      background-color: rgb(70, 116, 245);
    }
  }
}
</style>