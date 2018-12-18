export default class CacheHelper {

  /**
   * 设置
   *
   * @param {string} name
   * @param {object} value
   * @param {number} minutes
   * @memberof CacheHelper
   */
  static set(name, value, minutes) {
    const cacheData = {
      data: value,
      expires: (Date.now() + minutes * 60 * 1000)
    }
    localStorage.setItem(name, JSON.stringify(cacheData))
  }

  /**
   * 获取
   *
   * @param {string} name
   * @returns
   * @memberof CacheHelper
   */
  static get(name) {
    const cacheData = localStorage.getItem(name);
    if (!cacheData || Date.now() > cacheData.expires) {
      return null;
    }
    return JSON.parse(cacheData).data;
  }

  /**
   * 删除
   *
   * @param {string} name
   * @memberof CacheHelper
   */
  static del(name) {
    localStorage.removeItem(name);
  }
};
