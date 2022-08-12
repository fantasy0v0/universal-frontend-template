import { DateTime } from "luxon";

/**
 * 会话信息
 */
export class Session {

  /**
   * 认证信息
   */
  token!: string;

  /**
   * 过期时间
   */
  expiration!: string;

  /**
   * 是否已经到期
   */
  expired() {
    let d1 = DateTime.fromFormat(this.expiration, "yyyyMMddHHmmss");
    return d1 < DateTime.now();
  }
}
