// import ChromeApiHelper from '@/helpers/ChromeApiHelper';
// import ChromeMsgType from '@/consts/ChromeMsgType';

// console.log('This is BACKGROUND page!')

// const oldLigeruiJsUrl = 'manage.360kad.com/Content/scripts/ligerUI/js/ligerui.all.js';
// const newLigeruiJsUrl = chrome.extension.getURL("js/ligerui.all.js");

// 监听来自content-script的消息
// ChromeApiHelper.listenMessage().then((result) => {
//   debugger;
//   console.log(`收到消息，发送人信息如下：`);
//   console.log(result.sender);
//   console.log(`消息内容如下：`);
//   console.log(result.message);

//   result.sendResponse({
//     text: 'bgTest'
//   });
// });

// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeRequest.addListener(details => {
  console.log("onBeforeRequest:");
  console.log(details);
  // if (details.url.includes(oldLigeruiJsUrl)) {
  //   console.log('已替换');
  //   return {
  //     redirectUrl: newLigeruiJsUrl
  //   };
  // }
}, {
  urls: ["<all_urls>"],
  types: ["script"]
}, ["blocking"]);
