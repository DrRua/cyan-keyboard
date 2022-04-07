
const { app, BrowserWindow } = require('electron')
const { showLoading, createWindow } = require('./set-window')
require('./message-handler')
require('./key-evnet')

// 判断是否已有一个打开的进程
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    else app.focus()
  })
}

// 任务栏右键菜单
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])

// app载入
app.whenReady().then(() => {
  createWindow(app)

  const { initBindAll } = require('./key-evnet')
  initBindAll()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('ready', () => {
  showLoading();
})

// 关闭所有窗口时（默认为退出程序，重写可修改默认行为）
app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') app.quit()
})

