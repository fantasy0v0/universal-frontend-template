import {SimpleDataVO} from "../../../../services/vo/SimpleDataVO";

export interface SystemResourceUpdateConfig {

  /**
   * 0 表示新增
   */
  id: number

  name: string

  flag?: string

  remarks?: string

  /**
   * 上级资源
   */
  parent?: SimpleDataVO

}
