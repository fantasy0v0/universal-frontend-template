
export class LoginResponse {

  /**
   * 用户编号
   */
  id!: number;

  /**
   * 用户名称
   */
  name!: string;

  /**
   * 认证信息
   */
  token!: string;

  /**
   * 角色编号
   */
  role!: number;

  /**
   * 权限集合
   */
  permissions!: string[];

  /**
   * 过期时间
   */
  expiration!: string;
}
