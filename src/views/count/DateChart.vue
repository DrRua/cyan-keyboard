<template>
  <div class="echarts-box">
    <div class="top-line">
      <h3 class="h3-title">时间统计</h3>
      <input
        type="text"
        class="date-input date-select"
        placeholder="时间筛选"
      >
    </div>
    <div
      ref="dateChartRef"
      class="echart-chart"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onActivated, watch } from 'vue'
import { getDateChartOption } from './use-option'
import { dateJsInstance } from '@/utils/jedate'
import dayjs from 'dayjs'
import * as echarts from 'echarts'

const props = defineProps({
  data: { type: Object, default: () => { } }
})
const dateChartRef = ref(null)
let dateChart = ref(null)
const state = reactive({
  allData: {},
  selectDate: '',
  dateChartOption: getDateChartOption(),
})

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
  dateJsInstance('.date-select', {
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
  if (!dateChart) return
  const allDate = Object.keys(state.allData).map(date => date.split('-')[0])
  if (!allDate.length) return
  if (type === 'all') {
    const endDate = dayjs(allDate[allDate.length - 1])
    const startDate = dayjs(allDate[0])
    const diffDate = endDate.diff(startDate, 'day')
    const xData = Array(diffDate).fill(null).map((date, index) => {
      return startDate.add(index, 'day').format('YYYY-MM-DD')
    })
    state.dateChartOption.xAxis.data = xData
    const yData = xData.map(item => {
      const dayDate = Object.keys(state.allData).filter(date => {
        return item.match(/\d+/g).join('') === date.split('-')[0]
      }).map(item => Object.keys(state.allData[item]).length)
      return dayDate.reduce((p, n) => {
        return p + n
      })
    })
    state.dateChartOption.series[0].data = yData
  } else if (type === 'date') {
    const _FD = Object.keys(state.allData).filter(date => {
      return date.split('-')[0] === state.selectDate
    })
    const endDate = dayjs(_FD.length ? _FD[_FD.length - 1].replace('-', '') + '0000' : '')
    const startDate = dayjs(_FD.length ? _FD[0].replace('-', '') + '0000' : '')
    const diffDate = endDate.diff(startDate, 'hour') || _FD.length || 0
    const xData = Array(diffDate).fill(null).map((date, index) => {
      return startDate.add(index, 'hour').format('YYYYMMDD-HH')
    })
    const yData = xData.map(date => Object.keys(state.allData[date] || {}).length)
    state.dateChartOption.xAxis.data = xData.map(item => dayjs(item.replace('-', '') + '0000').format('MM-DD H'))
    state.dateChartOption.series[0].data = yData
  }
  dateChart.setOption(state.dateChartOption)
}

const resizeChart = () => {
  if (!dateChart) return
  dateChart.resize()
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
  dateChart = echarts.init(dateChartRef.value)
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