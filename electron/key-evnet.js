
const { app } = require('electron')
const ioHook = require('iohook')
const Store = require('electron-store')
const { getKey } = require('./key-map')
const dayjs = require('dayjs')

const option = {
  name: 'key-record', // 文件名称,默认 config
  fileExtension: 'json', // 文件后缀,默认json
  cwd: app.getPath('userData'), // 文件位置,尽量不要动
  // encryptionKey:'aes-256-cbc' , // 对配置文件进行加密
  clearInvalidConfig: true, // 发生 SyntaxError  则清空配置,
}

const store = new Store(option)

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

const renderKey = (type, keyName, code) => {
  if (!keyName) return false
  const { sendMsg } = require('./message-handler')
  sendMsg(null, type, { keyName, code })
}

ioHook.start()

module.exports = {
  ioHook,
  store
}
