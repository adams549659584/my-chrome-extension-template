module.exports = {
  // 插件的名称
  name: '基于Vue的谷歌扩展模板',
  // 插件的版本
  version: '1.0.0',
  // 插件描述
  description: '基于Vue的谷歌扩展模板',
  // 插件作者
  author: '罗君',
  // 清单文件的版本，这个必须写，而且必须是2
  manifest_version: 2,
  // 图标，一般偷懒全部用一个尺寸的也没问题
  icons: {
    '16': 'icons/main.png',
    '48': 'icons/main.png',
    '128': 'icons/main.png'
  },
  // 权限申请
  permissions: [
    "contextMenus", // 右键菜单
    "tabs", // 标签
    "notifications", // 通知
    "webRequest", // web请求
    "webRequestBlocking", // 阻塞式web请求
    "storage", // 插件本地存储
    "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
    "https://*/*", // 可以通过executeScript或者insertCSS访问的网站
    "clipboardWrite", // 剪贴版写入
    "clipboardRead", // 剪贴版读取
  ],
  // 浏览器右上角图标设置，browser_action、page_action、app必须三选一
  browser_action: {
    default_icon: {
      '19': 'icons/main.png',
      '38': 'icons/main.png',
      '128': 'icons/main.png'
    },
    // 图标悬停时的标题，可选
    default_title: "基于Vue的谷歌扩展模板",
    default_popup: "pages/popup.html"
  },
  // 当某些特定页面打开才显示的图标
  /*"page_action":
  {
  	"default_icon": "img/icon.png",
  	"default_title": "我是pageAction",
  	"default_popup": "popup.html"
  },*/
  // 会一直常驻的后台JS或后台页面
  background: {
    // persistent: false,
    scripts: ['js/background.js']
  },
  // Chrome40以前的插件配置页写法
  // options_page: 'pages/options.html',
  // Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个
  options_ui: {
    "page": "pages/options.html",
    // 添加一些默认的样式，推荐使用
    "chrome_style": false
  },
  // 需要直接注入页面的JS
  content_scripts: [{
      //matches: ["http://*/*", "https://*/*"],
      // "<all_urls>" 表示匹配所有地址
      matches: ["http://tstmanage.360kad.com/*", "http://rcmanage.360kad.com/*", "http://manage.360kad.com/*"],
      // 多个JS按顺序注入
      js: ['js/content.js'],
      // JS的注入可以随便一点，但是CSS的注意就要千万小心了，因为一不小心就可能影响全局样式
      // css: ["css/custom.css"],
      // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
      run_at: 'document_end',
      // all_frames: false
    },
    // 这里仅仅是为了演示content-script可以配置多个规则
    // {
    //   "matches": ["*://*/*.png", "*://*/*.jpg", "*://*/*.gif", "*://*/*.bmp"],
    //   "js": ["js/show-image-content-size.js"]
    // }
  ],
  // 权限申请
  permissions: [
    "notifications", // 通知
    "webRequest", // web请求
    "webRequestBlocking", // 阻塞式web请求
    "storage", // 插件本地存储
    "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
    "https://*/*", // 可以通过executeScript或者insertCSS访问的网站
    "tabs",
    "cookies"
  ],
  // Chrome Extension 中的 CSP（Content Security Policy https://blog.csdn.net/qq_21859119/article/details/78802687
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  //普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
  web_accessible_resources: ['js/content.js','js/ligerui.all.js'],
  // 插件主页，这个很重要，不要浪费了这个免费广告位
  homepage_url: "https://www.baidu.com",
  // 覆盖浏览器默认页面
  // chrome_url_overrides: {
  //   // 覆盖浏览器默认的新标签页
  //   "newtab": "newtab.html"
  // },
  // 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
  omnibox: {
    "keyword": "go"
  },
  // 默认语言
  // default_locale: "zh_CN",
  // devtools页面入口，注意只能指向一个HTML文件，不能是JS文件
  // devtools_page: "pages/devtools.html"
}