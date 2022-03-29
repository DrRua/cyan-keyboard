
const { contextBridge, ipcRenderer } = require('electron')

// window.$electron 添加属性
contextBridge.exposeInMainWorld('$electron', {
  // 接收消息方法
  onMessage: (msg, callback) => {
    ipcRenderer.on(msg, (event, arg) => {
      callback(event, arg)
    })
  },
  sendMsg: (msg) => ipcRenderer.send('message', msg),
  // 渲染进程发送消息方法
  // ipcRenderer
})