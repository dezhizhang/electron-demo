
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
### electron的打包
打包是开发 electron 应用中最后的一个环节，也是最重要的一个步骤。如果打包遇到问题， 
那你前面的所有努力也就白费了。目前官方的打包工具主要包括2种， 
分别是 electron-packager 和 electron-builder，下面分别介绍这两种打包方式的区别以及注意事项。
#### electron-packager
- 安装依赖包
```
npm install electron-packager --save-dev
```
- 配置package.json脚本
```
scripts": {
   "start": "electron .",
   "packageOS": "electron-packager . <appname> --platform=mas --arch=x64 --icon=dms --out=./dist --asar --app-version=1.0.0",
   "packageWin64": "electron-packager . <appname> --platform=win32 --arch=x64 --icon=dms --out=./dist --asar --app-version=1.0.0",
   "packageWin32": "electron-packager . <appname> --platform=win32 --arch=ia32 --icon=dms --out=./dist --asar --app-version=1.0.0"
}
```
- 优缺点
置简单，易上手 2）直接生成.app, .exe 等可执行的文件，用户无需安装，打开即可使用。  
（这样的缺点是包体积会较大，且不能自动添加到用户的快捷方式或者应用程序里面）  
 3）打包很慢，卡住不动 4）不支持跨平台打包

#### electron-builder
- 安装依赖包
```
yarn add electron-builder --dev
```
- 配置package.json脚本
```
"scripts": {
    "start": "electron .",
    "distOS": "electron-builder --mac",
    "distWin64": "electron-builder --win --x64",
    "distWin32": "electron-builder --win --ia32",
    "postinstall": "electron-builder install-app-deps",
},

```
- mac下配置
```
"build": {
    "productName": "DMS",
    "appId": "com.electron.dms.1.0.0",
    "asar": false,
    "mac": {
      "icon": "icons/dms.icns",
      "target": "default"
    },
  },
```
- windows
```
"build": {
    "productName": "DMS",
    "appId": "com.electron.dms.1.0.0",
    "asar": false,
    "win": {
      "icon": "icons/dms.ico",
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64"
          ]
        }
      ]
    },
    "nsis": {
      "oneClick": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "icons/dms.ico",
      "uninstallerIcon": "icons/dms.ico",
      "installerHeaderIcon": "icons/dms.ico",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "dms"
    }
  },
```
- 优缺点
1）功能强大，上手较复杂，配置参数繁多
2）即支持生成可执行程序，也可以生成 dmg、exe 等安装程序
3）内置热升级模块，调用方便
4）打包时最好使用 cnpm run build，否则镜像下载太慢，会卡住。
5）支持跨平台打包（mac 打 windows 的包有的依赖包可能下载很慢，需要手动安装）







