
const { app } = require('electron')
const Store = require('electron-store')
// 键盘记录存储文件
const option = {
  name: 'key-record', // 文件名称,默认 config
  fileExtension: 'json', // 文件后缀,默认json
  cwd: app.getPath('userData'), // 文件位置,尽量不要动
  // encryptionKey:'aes-256-cbc' , // 对配置文件进行加密
  clearInvalidConfig: true, // 发生 SyntaxError  则清空配置,
}
const store = new Store(option)

// 配置记录存储文件
const configOption = {
  name: 'user-config',
  fileExtension: 'json',
  cwd: app.getPath('userData'),
  clearInvalidConfig: true,
}
const configStore = new Store(configOption)

module.exports = {
  store,
  configStore,
}