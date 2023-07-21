import {SimpleDataVO} from "../../../vo/SimpleDataVO";

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
   * 角色信息
   */
  role: SimpleDataVO;

  /**
   * 权限集合
   */
  permissions: string[];
}
