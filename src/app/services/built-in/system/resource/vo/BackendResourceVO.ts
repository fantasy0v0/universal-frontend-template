
export interface BackendResourceVO {

  /**
   * 资源编号
   */
  id: number,

  /**
   * 资源名称
   */
  name: string,

  /**
   * 上级资源编号
   */
  parent?: number,

  /**
   * 资源标识
   */
  flag?: string,

  /**
   * 资源备注
   */
  remarks?: string

  /**
   * 创建时间
   */
  createdAt: string,

  /**
   * 更新时间
   */
  updatedAt: string

}
