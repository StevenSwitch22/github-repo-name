//现在渲染器能全局访问 versions了
const information = document.getElementById('info')
information.innerText = `now applca use chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

//将发送器与接收器设置完成之后，可以将信息通过刚刚定义的 ’ping‘ 通道从渲染器发送到主进程中
const func = async () => {
    const response = await window.versions.ping()
    console.log(response)  //打印 'pong'
}

func()