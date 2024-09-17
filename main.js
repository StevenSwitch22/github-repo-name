//console.log("Hello from Electorn **")

//导入 app BrowserWindow 模块
//app， 负责应用程序的事件生命周期
//BrowserWindow，它负责创建和管理应用窗口
//在主进程中设置handle 监听器
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

// createWindow() 函数将你的HTML页面加载到 BrowserWindow 窗口中
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 400,
        //为了将脚本附在渲染进程上，在 BrowserWindow 构造器中使用 webPreferences.preload 传入脚本的路径
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile ('index.html')
}

//在Electron中，只有在app模块的 ready 事件触发后才能创建 BrowserWindow 实例
//通过 app.whenReady() API监听 ready事件，ready 事件成功触发后调用 createWindow() 方法
app.whenReady().then(() => {
    //在HTML文件加载之前完成了这些，才能保证在你从渲染器发送 invoke 调用之前处理程序能够准备就绪
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    //对macOS来说，需要没有窗口也让应用继续运行
    //即没有窗口可用时调用app打开一个新窗口
    //监听 activate 事件，没有任何活动的 BrowserWindow，调用 createWindow() 方法创建一个
    //窗口无法在 ready 事件前创建，应当在应用初始化后监听 activate 事件
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

//我们通常希望在关闭一个应用的所有窗口后让它退出
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
})

