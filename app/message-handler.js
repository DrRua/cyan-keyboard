const { app, ipcMain } = require('electron')
const robotjs = require('robotjs')
const { store } = require('./key-evnet')
const { getCurrWin, aboutWindow } = require('./set-window')

// 接收渲染进程消息
ipcMain.on('message', async (event, arg) => {
  const win = getCurrWin()
  const handlerName = arg?.handler || arg
  if (!handlerNames.includes(handlerName)) {
    sendMsg(win, 'message', `${handlerName} not found`)
    return false
  }
  const handlerFn = handler[handlerName]
  const msg = await handlerFn(win, arg)
  sendMsg(win, handlerName, { handler: handlerName, msg })
})

// 消息处理方法
const handler = {
  getVsersion: async () => {
    const version = app.getVersion()
    return version
  },
  // 关闭所有窗口
  closeWin: async (win = {}) => win.close(),
  // 退出程序
  exitApp: async () => app.exit(),
  // 设置窗口全屏/取消全屏
  maxScreen: async (win = {}) => {
    const isMax = win.isMaximized()
    if (isMax) win.unmaximize()
    else win.maximize()
    return !isMax
  },
  // 设置最小化/还原 窗口
  minScreen: async (win = {}) => {
    const isMin = win.isMinimized()
    if (isMin) win.restore()
    else win.minimize()
    return 'success'
  },
  winReload: async (win = {}) => win.reload(),
  // 查看关于窗口
  showAbout: async (win = {}) => {
    aboutWindow(win)
  },
  // 获取打印机列表
  getPrinter: async (win = {}) => {
    const list = win.webContents.getPrinters()
    return list
  },
  // 设置鼠标位置
  setMouse: async () => {
    robotjs.dragMouse(100, 100)
    robot.mouseClick()
  },
  // 获取存储路径
  getStorePath: async () => {
    const path = store.path
    return path
  },
  // 获取存储数据
  getStoreData: async () => {
    const data = store.store
    return data
  }
}
// 所有已注册方法列表
const handlerNames = Object.keys(handler)

// 从窗口发送消息
const sendMsg = (win = null, type = 'message', msg) => {
  const curWin = win || getCurrWin()
  if (!curWin || !curWin?.isFocused?.()) return
  curWin.webContents.send(type, msg)
}

module.exports = {
  sendMsg
}
