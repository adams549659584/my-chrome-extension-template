export default class ChromeApiHelper {
  /**
   * 获取当前窗口信息 https://developer.chrome.com/extensions/windows#method-getCurrent
   */
  static currentWindow() {
    return new Promise((resolve, reject) => {
      chrome.windows.getCurrent({}, (win) => {
        resolve(win);
      });
    });
  }

  /**
   * 最大化当前窗口
   */
  static async windowToMax() {
    const thatWin = await ChromeApiHelper.currentWindow();
    return updateWindow(thatWin.id, {
      state: windowState.maximized
    });
  }

  /**
   * 最小化当前窗口
   */
  static async windowToMin() {
    const thatWin = await ChromeApiHelper.currentWindow();
    return updateWindow(thatWin.id, {
      state: windowState.minimized
    });
  }

  /**
   * 获取当前激活的选项卡
   */
  static async getCurrentTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        resolve(tabs && tabs.length > 0 && tabs[0]);
      });
    });
  }

  /**
   * 向选项卡发送消息 https://developer.chrome.com/extensions/tabs#method-sendMessage
   * @param {number} tabId 选项卡Id
   * @param {string} type ChromeMsgType
   * @param {object} data 消息
   */
  static async sendMessageToTab(tabId, type, data) {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, {
        id: getGuid(),
        type,
        data
      }, (response) => {
        resolve(response);
      });
    });
  }

  /**
   * 向Inject发送消息
   * @param {string} type ChromeMsgType
   * @param {object} data 消息
   */
  static async sendMessageToInject(type, data) {
    const tahtTab = await ChromeApiHelper.getCurrentTab();
    return ChromeApiHelper.sendMessageToTab(tahtTab.id, type, data);
  }

  /**
   * 向后台发送消息
   * @param {string} type ChromeMsgType
   * @param {object} data 消息
   */
  static async sendMessageToBackgroud(type, data) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        id: getGuid(),
        type,
        data
      }, (response) => {
        resolve(response);
      });
    });
  }

  /**
   * 监听消息 https://developer.chrome.com/extensions/runtime#event-onMessage
   */
  static async listenMessage() {
    return new Promise((resolve, reject) => {
      chrome.runtime && chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        resolve({
          message,
          sender,
          sendResponse
        });
        return true; //The chrome.runtime.onMessage listener must return true if you want to send a response after the listener returns (message was sent by extensionkbfddcncdcbklgbckgfaloflahhoalna).
      });
    });
  }

  /**
   * 监听windows消息
   */
  static async listenWinMessage() {
    return new Promise((resolve, reject) => {
      window.addEventListener("message", (e) => {
        resolve(e.data);
      }, false);
    });
  }

  /**
   * 
   * @param {string} tabId 运行脚本的选项卡的ID
   * @param {InjectDetails} injectDetails 要运行的脚本的详细信息。必须设置代码或文件属性，但两者可能不会同时设置。
   */
  static async executeScriptToTab(tabId, injectDetails) {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(tabId, injectDetails, (result) => {
        resolve(result);
      });
    });
  }

};

/**
 * 更新一个视窗的属性。只指定那些你希望修改的属性，未指定的属性将保持不变。
 * @param {number} windowId 窗口id
 * @param {object} updateInfo https://developer.chrome.com/extensions/windows#method-update
 */
const updateWindow = (windowId, updateInfo) => {
  return new Promise((resolve, reject) => {
    chrome.windows.update(windowId, updateInfo, (optional) => {
      resolve(optional);
    });
  });
}

const windowState = {
  /**正常窗口状态（未最小化，最大化或全屏）。 */
  normal: 'normal',
  /**最小化窗口状态。 */
  minimized: 'minimized',
  /**最大化窗口状态。 */
  maximized: 'maximized',
  /**全屏窗口状态。 */
  fullscreen: 'fullscreen',
  /**自Chrome M59以来已弃用。不再支持停靠窗口。此状态将转换为“正常”。 */
  docked: 'docked'
};

const getGuid = () => {
  return Date.now().toString();
}
