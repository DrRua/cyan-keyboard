
const { app, globalShortcut } = require('electron')
const ioHook = require('iohook')
const robotjs = require('robotjs')
const { store, configStore } = require('./file-store')
const { getKey } = require('./key-map')
const dayjs = require('dayjs')

// 监听键盘事件
ioHook.on('keyup', (event) => {
  const code = event.rawcode // 键码
  const dayHour = dayjs().format('YYYYMMDD-HH') // 日期小时
  const time = dayjs().valueOf().toString() // 时间戳
  const hasKey = store.get(`${dayHour}.${time}`) // 是否同时多个按键
  let keyName = getKey(code) // 键名
  if (!keyName) return false
  // if (hasKey) keyName.unshift(...hasKey)
  if (hasKey) keyName = keyName + ',' + hasKey
  store.set(`${dayHour}.${time}`, keyName)
  renderKey('keyup', keyName, code)
})
ioHook.on('keydown', (event) => {
  const code = event.rawcode // 键码
  let keyName = getKey(code) // 键名
  renderKey('keydown', keyName, code)
})
// 发送键盘事件消息到页面
const renderKey = (type, keyName, code) => {
  if (!keyName) return false
  const { sendMsg } = require('./message-handler')
  sendMsg(null, type, { keyName, code })
}

ioHook.start()

// 注册全局快捷键绑定事件
const bindKeyMethod = (key, input, timeout = 300) => {
  if (!key) return
  const accelerator = `Ctrl+Alt+${key}`
  const isRegist = globalShortcut.isRegistered(accelerator)
  if (isRegist) unBindKey(key)
  const result = globalShortcut.register(accelerator, () => {
    const inputStr = input.split('')
    if (!inputStr.length) return
    setTimeout(() => {
      tapKey(inputStr, timeout)
    }, 300)
  })
  if (result) {
    const savedKey = configStore.get('key-bind')
    const saveData = savedKey || []
    saveData.push({ key, input, timeout })
    configStore.set('key-bind', saveData)
  }
  return result
}
// 取消绑定快捷键事件
const unBindKey = (key) => {
  const accelerator = `Ctrl+Alt+${key}`
  const result = globalShortcut.unregister(accelerator)
  const saveData = configStore.get('key-bind')
  const delIndex = saveData.findIndex(k => k.key === key)
  if (delIndex > -1) saveData.splice(delIndex, 1)
  configStore.set('key-bind', saveData)
  return result
}

// 取消所有绑定
const unBindAll = () => {
  const result = globalShortcut.unregisterAll()
  configStore.delete('key-bind')
  return result
}

// 输入按键
const tapKey = (keys, timeout) => {
  if (!keys.length) return
  const nextKey = keys[0]
  setTimeout(() => {
    robotjs.keyTap(nextKey)
    keys.shift()
    tapKey(keys, timeout)
  }, timeout)
}

let intervalClick = null
// 绑定鼠标连点
const bindMouseClick = (key, timeout = 300) => {
  if (!key) return
  const accelerator = `Ctrl+Alt+${key}`
  const isRegist = globalShortcut.isRegistered(accelerator)
  if (isRegist) unBindKey(key)
  const result = globalShortcut.register(accelerator, () => {
    if (intervalClick !== null) {
      clearInterval(intervalClick)
      intervalClick = null
    } else {
      setTimeout(() => {
        mouseClick(timeout)
      }, 300)
    }
  })
  return result
}
// 鼠标连点
const mouseClick = (timeout) => {
  intervalClick = setInterval(() => {
    robotjs.mouseClick()
  }, timeout)
}

module.exports = {
  ioHook,
  store,
  bindKeyMethod,
  unBindKey,
  unBindAll,
  bindMouseClick,
}
