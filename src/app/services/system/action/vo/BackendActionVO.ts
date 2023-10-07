
export interface BackendActionVO {

  /**
   * 动作编号
   */
  id: number,

  /**
   * 动作名称
   */
  name: string,

  /**
   * 关联的资源编号
   */
  resource?: number,

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
