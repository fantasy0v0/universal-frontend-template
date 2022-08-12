/**
 * 角色状态
 */
export enum UserStatus {
  /**
   * 待审核
   */
  PendingReview,
  /**
   * 正常
   */
  Normal,

  /**
   * 已禁用
   */
  Disabled
}

/**
 * 角色状态转换
 */
export function mapUserStatus(status: UserStatus) {
  switch (status) {
    case UserStatus.PendingReview:
      return "待审核";
    case UserStatus.Normal:
      return "正常";
    case UserStatus.Disabled:
      return "已禁用";
    default:
      return "未知";
  }
}
