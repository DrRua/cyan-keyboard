<template>
  <div class="echarts-box">
    <div class="top-line">
      <h3 class="h3-title">按键统计</h3>
      <input
        type="text"
        class="date-input count-select"
        placeholder="时间筛选"
      >
    </div>
    <div
      ref="totalChartRef"
      class="echart-chart"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onActivated, watch } from 'vue'
import { keyList, getKeyChartOption } from './use-option'
import { dateJsInstance } from '@/utils/jedate'
import dayjs from 'dayjs'
import * as echarts from 'echarts'

const props = defineProps({
  data: { type: Object, default: () => { } }
})
const totalChartRef = ref(null)
let totalChart = ref(null)
const state = reactive({
  allData: {},
  selectDate: '',
  totalChartOption: getKeyChartOption(),
})

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
  dateJsInstance('.count-select', {
    format: 'YYYY-MM-DD',
    maxDate: dayjs().format('YYYY-MM-DD'),
    theme: { bgcolor: "#00A1CB", color: "#ffffff", pnColor: "#00CCFF" },
    clearfun: () => {
      setOption('all')
    },
    donefun: (obj) => {
      state.selectDate = dayjs(obj.val).format('YYYYMMDD')
      setOption('date')
    }
  })
})

onActivated(() => {
  resizeChart()
})

const setOption = (type = 'all') => {
  if (!totalChart) return
  if (type === 'all') {
    const yData = keyList.map(key => {
      return { name: key, value: 0 }
    })
    const allKeyData = []
    Object.values(state.allData).forEach(dateKey => {
      allKeyData.push(...Object.values(dateKey))
    })
    yData.forEach(key => {
      key.value = allKeyData.filter(item => item === key.name).length
    })
    state.totalChartOption.series[0].data = yData.map(item => item.value)
  } else if (type === 'date') {
    const filterData = Object.keys(state.allData).filter(date => {
      return date.split('-')[0] === state.selectDate
    })
    const allKeyData = filterData.map(item => Object.values(state.allData[item])).flat()
    const yData = keyList.map(key => {
      return allKeyData.filter(item => item === key).length
    })
    state.totalChartOption.series[0].data = yData
  }
  totalChart.setOption(state.totalChartOption)
}

const resizeChart = () => {
  if (!totalChart) return
  totalChart.resize()
}

watch(
  () => props.data,
  (val) => {
    state.allData = { ...val }
    setOption()
  },
  { deep: true, immediate: false }
)

const initChart = () => {
  totalChart = echarts.init(totalChartRef.value)
  // const zoomSize = 6
  // state.totalChart.on('click', function (params) {
  //   state.totalChart.dispatchAction({
  //     type: 'dataZoom',
  //     startValue: keyList[Math.max(params.dataIndex - zoomSize / 2, 0)],
  //     endValue: keyList[Math.min(params.dataIndex + zoomSize / 2, keyList.length - 1)]
  //   })
  // })
}

</script>

<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 300px;

  .echart-chart {
    width: 100%;
    height: 100%;
  }
}
</style>