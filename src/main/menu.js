/*
 * @Author: your name
 * @Date: 2021-11-17 20:51:32
 * @LastEditTime: 2021-11-17 21:30:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /electron-demo/src/main/menu.js
 */
/*
 * @Author: your name
 * @Date: 2021-11-17 20:45:01
 * @LastEditTime: 2021-11-17 20:49:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /electron-demo/src/main/menu.js
 */

const { Menu, dialog, BrowserWindow, shell,Tray, } = require("electron");
const Main = require("electron/main");

async function browserWindow() {
  let min = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  min.webContents.openDevTools();
  min.loadURL("../../public/index.html");
}

async function showOpenDialog() {
  const res = await dialog.showOpenDialog({
    title: "打开一个文件",
    buttonLabel: "按此打开文件",
    properties: ["multiSelections", "openFile"],
  });
  console.log("res", res);
}

async function showSaveDialog() {
  const res = await dialog.showSaveDialog({
    title: "保存文件",
    properties: ["multiSelections", "openFile"],
    buttonLabel: "保存存文件",
  });
  console.log("res", res);
}

async function showMessageBox() {
  const res = await dialog.showMessageBox({
    message: "我是一条消息",
    type: "info",
    buttons: ["确定", "取消"],
  });
}

async function otherOpen() {
    const res = shell.openExternal('https://www.baidu.com')
}

const template = [
  {
    label: "",
  },
  {
    label: "文件",
    submenu: [
      {
        label: "新建窗口",
        click() {
          browserWindow();
        },
      },
      {
        label: "打开文件夹",
        click() {
          showOpenDialog();
        },
      },
      {
        label: "保存",
        click() {
          showSaveDialog();
        },
      },
      {
        label: "打开消息",
        click() {
          showMessageBox();
        },
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "复制",
      },
      {
        label: "前切",
      },
      {
        label: "查找",
      },
    ],
  },
  {
    label: "查找",
  },
  {
    label: "其它",
    submenu: [
      {
        label: "打开网页",
        click() {
          otherOpen();
        },
      },
    ],
  },
];


const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);


