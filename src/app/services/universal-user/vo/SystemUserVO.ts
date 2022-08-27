import {SimpleDataVO} from "../../vo/SimpleDataVO";

export interface SystemUserVO {

  /**
   * 用户编号
   */
  id: number,

  /**
   * 用户名称
   */
  name: string,

  /**
   * 用户状态
   */
  status: string

  /**
   * 联系号码
   */
  contactNumber?: string;

  /**
   * 角色
   */
  role: SimpleDataVO,

  /**
   * 创建时间
   */
  createdAt: string
}
