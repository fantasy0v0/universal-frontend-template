
export interface SystemUserAddRequest {

  /**
   * 用户姓名
   */
  name: string,

  /**
   * 用户角色
   */
  role: number,

  /**
   * 联系号码
   */
  contactNumber?: string,

  /**
   * 认证类型
   */
  type: number,

  /**
   * 账号
   */
  account: string,

  /**
   * 密码
   */
  password: string
}
