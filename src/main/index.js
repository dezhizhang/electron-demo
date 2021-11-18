/*
 * @Author: your name
 * @Date: 2021-11-14 16:06:07
 * @LastEditTime: 2021-11-19 01:42:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /electron-demo/main.js
 */
const fs = require('fs-extra')
const URL = require("url");
const Store = require('electron-store')
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');

const { app, BrowserWindow, ipcMain, globalShortcut,screen,navigator, webContents,powerMonitor,net } = require("electron");
const path = require("path");
const { double } = require("cli-boxes");
require("./menu.js");

let win = null;

async function createWindow() {
    // 获取扩展屏的信息
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    });

    if(externalDisplay) {
        win = new BrowserWindow({
            //kiosk:true,
            x:externalDisplay.bounds.x + 50,
            y:externalDisplay.bounds.y + 50,
            webPreferences:{
                webSecurity:false,
                nodeIntegration:true,
                contextIsolation:false,
            }
        });
        win.webContents.openDevTools();
        // 打印机
        // win.webContents.print({
        //     silent:false,
        //     printBackground:true,
        //     deviceName:''
        // },(success,error) => {
        //     console.log('success',success)
        //     console.log('error',error)
        // })

        // //导出pdf
        // const data = await win.webContents.printToPDF({});
        // let filePath = './public/index.pdf'
        // fs.writeFile(filePath,data,error => {
        //     console.log(error)
        // });

        // 电源
        // console.log(powerMonitor.getSystemIdleState(10))


        // 保存用户信息
        // const dataPath = app.getPath('userData')
        // console.log('dataPath',dataPath)
        // const buf = Buffer.from('hello world') 
        // console.log(buf)
        // fs.writeFileSync(dataPath + '/a.text',buf,{'encoding':'utf-8'})

        // 第三方数据库lowdb
        // const adapter = new FileSync('db.json');
        // const db = low(adapter);
        // // 查找数据
        // db.get('post').find({id:1}).value();
        
        // // 更新数据
        // db.get('post').find({title:'low'}).assign({title:'hi'}).write();

        //electron中的store
        // const store = new Store()
        // store.set('key','value')
        // console.log(store.get('key')) 
        // store.set('foo.bar',true) // 可以级联json对像设置
        // console.log(store.get('foo'))
        // store.delete('key')

        
        
        win.loadFile("./public/index.html");
    }
}






app.on("ready", createWindow);

//主进程获取数据
ipcMain.on('ipcRender-main-data',async(event) => {
  const request = net.request('https://cnodejs.org/api/v1/topics')
  request.on('response',response => {
    response.on('data',data => {
      event.reply('main-data-success',`${data}`)
      console.log('data',`${data}`)
    })
  })
  request.end()
})

// ipc通信
// 主进程主动向渲染进程发消息
ipcMain.handle("main-message", async () => {
  return new Promise((resolve, reject) => {
    resolve("ok");
  });
});

// 接收渲染进程发来的消息
ipcMain.on("ipcRender-message", (event, msg) => {
  console.log("msg", msg);
  event.reply("main-reply", "pong");
});

app.on("window-all-closed", () => {
  app.quit();
});
