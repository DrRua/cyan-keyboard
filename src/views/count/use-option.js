
// 键盘所有键列表
export const keyList = [
  'Backspace',
  'Tab',
  'Enter',
  'CapsLock',
  'ESC',
  'Space',
  'Page Up',
  'Page Down',
  'End',
  'Home',
  '←',
  '↑',
  '→',
  '↓',
  'Del',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'win',
  'win',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '*',
  '+',
  '/',
  '.',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'NumLk',
  'Shift',
  'Shift',
  'Ctrl',
  'Ctrl',
  'Alt',
  'Alt',
  ';:',
  ',<',
  '=+',
  '-_',
  '.>',
  '/?',
  '`',
  '[',
  '\|',
  ']',
  '"'
]

// 柱状图
export const getKeyChartOption = (option = {}) => {
  const defaultOption = {
    grid: {
      right: '5%',
      top: '15%'
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) => {
        const tip = params[0]
        return `按键：${tip.name}<br />次数：${tip.marker} ${tip.value}`
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        type: 'slider',
        brushSelect: false,
      }
    ],
    xAxis: {
      name: '按键',
      type: 'category',
      show: true,
      data: keyList,
    },
    yAxis: {
      name: '单位/次',
      type: 'value',
      show: true,
      axisLine: {
        show: true
      }
    },
    series: [
      {
        data: [],
        type: 'bar',
      }
    ]
  }
  const _OPTION =  Object.assign(defaultOption, option)
  return _OPTION
}

// 折线图
export const getDateChartOption = (option = {}) => {
  const defaultOption = {
    grid: {
      right: '5%',
      top: '15%'
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: (params) => {
        const tip = params[0]
        return `时间：${tip.name}<br />次数：${tip.marker} ${tip.value}`
      }
    },
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     start: 0,
    //     end: 10
    //   },
    //   {
    //     type: 'slider',
    //     brushSelect: false,
    //   }
    // ],
    xAxis: {
      name: '时间',
      type: 'category',
      show: true,
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      name: '单位/次',
      type: 'value',
      show: true,
      axisLine: {
        show: true
      }
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  const _OPTION = Object.assign(defaultOption, option)
  return _OPTION
}
