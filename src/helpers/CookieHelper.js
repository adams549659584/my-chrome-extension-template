export default class CookieHelper {
  /**
   * 设置cookie
   *
   * @param {string} name
   * @param {string} value
   * @param {number} minutes
   * @memberof CookieHelper
   */
  static set(name, value, minutes) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * minutes * 60 * 1000);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }

  /**
   * 获取cookie
   *
   * @param {string} name
   * @returns
   * @memberof CookieHelper
   */
  static get(name) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  /**
   * 删除cookie
   *
   * @param {string} name
   * @memberof CookieHelper
   */
  static del(name) {
    this.set(name, '', -1);
  }
};
