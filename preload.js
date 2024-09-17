//Electron 的主进程是一个Node.js环境。渲染进程默认跑在网页页面，而非Node.js里
//为了将Electron不同类型的进程桥接在一起，需要预加载脚本
//预加载脚本在渲染器加载网页之前注入
//为渲染器添加需要特殊权限的功能，可以通过 contextBridge 接口定义全局对象

//Electron的主进程和渲染进程有着清楚的分工且不可互换
//无论是从渲染进程直接访问Node.js接口，亦或是从主进程访问HTML文档对象模型（DOM），都是不可能的
//解决这一问题的方法就是使用进程间通信（IPC）
//使用Electron的 ipcMain 模块和 ipcRenderer 模块来进行进程间通信
//为了从你的网页向主进程发送消息，使用 ipcMain.handle 设置一个主进程处理程序
//在预处理脚本中暴露一个 ipcRenderer.invoke 函数来触发该处理程序
const { contextBridge, ipcRenderer } = require('electron')

//使用预加载脚本增强渲染器
//该脚本通过versions这一全局变量，将Electron的 process.versions 对象暴露给渲染器
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron, 
    ping: () => ipcRenderer.invoke('ping')
})
