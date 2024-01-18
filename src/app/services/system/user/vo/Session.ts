import {SimpleDataVO} from "../../../vo/SimpleDataVO";

export interface Session {

  /**
   * 用户信息
   */
  user: SimpleDataVO;

  /**
   * 角色信息
   */
  role: SimpleDataVO;

  /**
   * 权限集合
   */
  permissions: string[];

  /**
   * 过期时间
   */
  expiration: string;
}
