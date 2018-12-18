import HttpHelper from '@/helpers/HttpHelper';
// function virtualGetResult (uri, data) {
//   return sleep(100).then(result => {
//     return http.get(`http://tstres.360kad.com/VirtualApi${uri}.json`, data);
//   });
// }

// function virtualPostResult (uri, data) {
//   return sleep(100).then(result => {
//     return http.post(`http://tstres.360kad.com/VirtualApi${uri}.json`, data);
//   });
// }
// async function sleep (timeout) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, timeout);
//   });
// }
export default class BaseApi {
  /**
   * http Get 请求
   *
   * @static
   * @param {string} uri 请求uri
   * @param {object} data 请求参数实体
   * @returns
   * @memberof BaseApi
   */
  static httpGet(uri, data) {
    // return virtualGetResult(uri, data);
    return HttpHelper.get(uri, data);
  }

  /**
   * http Post 请求
   *
   * @static 
   * @param {string} uri 请求uri
   * @param {object} data 请求参数实体
   * @returns
   * @memberof BaseApi
   */
  static httpPost(uri, data) {
    // return virtualPostResult(uri, data);
    return HttpHelper.post(uri, data);
  }
};
