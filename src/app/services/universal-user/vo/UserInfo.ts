
/**
 * 用户信息
 */
export interface UserInfo {

  /**
   * 用户编号
   */
  id: number;

  /**
   * 用户名称
   */
  name: string;

  /**
   * 角色编号
   */
  role: number;

  /**
   * 权限集合
   */
  permissions: string[];
}
