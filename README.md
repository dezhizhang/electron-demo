
# 桌面跨平台electron
### hello-world 
```
const {app,BrowserWindow}  = require('electron');

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width:600,
        height:800,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    });
    win.webContents.openDevTools();
    win.loadFile('./public/index.html')
}

app.on('ready',createWindow)

app.on('window-all-closed',() => {
    app.quit();
})
```
### nodejs能力
```
const fs = require('fs');
const path = require('path');

//读取文件
window.onload = function() {
    const btn = document.getElementById('btn');
    const content = document.getElementById('content');
    btn.onclick = async function() {
        const res = await fs.readFileSync(__dirname + path.join('/index.html'));
        console.log('res',res)
        content.innerHTML = `${res}`;
    }
}
```
### ipc通信

```
// 沉浸进程
const { ipcRenderer } = require('electron');

window.onload = function() {
    const  btn = document.getElementById('btn')
    const content = document.getElementById('content');

    btn.onclick = function() {
        ipcRenderer.send('ipcRender-message','ping')
        
    }

    ipcRenderer.on('main-reply',(event,msg) => {
        content.innerHTML = msg;
    })

    // 接收主进程发来消息
    ipcRenderer.invoke('main-message').then(res => {
        content.innerHTML = `${res}`
        console.log('res',res)
    })
}
```
```
// 主进程
const {app,BrowserWindow,ipcMain}  = require('electron');

let win = null;

function createWindow() {
    win = new BrowserWindow({
        width:600,
        height:800,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    });
    win.webContents.openDevTools();
    //win.loadFile('./public/index.html')
    //win.loadFile('./public/nodejs.html')
    win.loadFile('./public/ipc.html')
}


app.on('ready',createWindow)


// ipc通信
// 主进程主动向渲染进程发消息
ipcMain.handle('main-message',async() => {
    return new Promise((resolve,reject) => {
        resolve('ok')
    })
});

// 接收渲染进程发来的消息
ipcMain.on('ipcRender-message',(event,msg) => {
    console.log('msg',msg);
    event.reply('main-reply','pong')
})


app.on('window-all-closed',() => {
    app.quit();
})
```








