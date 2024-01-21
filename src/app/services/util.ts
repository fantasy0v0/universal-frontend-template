import {FormArray, FormGroup} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {firstValueFrom, map, Observable} from "rxjs";

export const ApiPrefix = "/api";

/**
 * 可为null类型
 */
export type Null<T> = T | null;

// 可为空
export type Optional<T> = T | undefined | null;

/**
 * 异常
 */
export class ResultError extends Error {

  code: string

  msg?: string

  data?: any;

  constructor(result: Result<any>) {
    super(result.msg);
    this.code = result.code;
    this.msg = result.msg;
    this.data = result.data;
  }
}

/**
 *  服务端接口响应类
 */
export interface Result<T> {

  /**
   * 错误码
   */
  code: string;

  /**
   * 错误信息
   */
  msg?: string;

  /**
   * 时间戳
   */
  timestamp: number,

  /**
   * 结果消耗的时间
   */
  elapsed: number,

  /**
   * 响应内容
   */
  data: T;
}

/**
 * 处理异常的响应消息
 */
export function castError<T>() {
  return catchError<T, never>(err => {
    throw new Error("未知错误, 请检查网络是否正常或者联系维护人员", err);
  });
}

/**
 * 异常提示
 * @param err 异常
 * @param topic 主题
 */
export function errorMessage(err: any, topic?: string) {
  let msg;
  if (err instanceof Error) {
    if (err instanceof ResultError) {
      msg = err.msg ? err.msg : '服务异常';
    } else {
      msg = err.message ? err.message : '未知错误';
    }
  } else if (typeof err === 'string') {
    msg = err;
  } else {
    console.error(err);
    msg = "未知错误";
  }
  if (null != topic) {
    msg = topic + ":" + msg;
  }
  console.error(err);
  return msg;
}

/**
 * 判断接口响应是否成功, 如果成功则返回结果中的data, 如果失败则抛出异常
 * @param result 响应结果
 * @return 返回响应结果中的data
 */
export function checkResult<T>(result: Result<T>) {
  if ("0" !== result.code) {
    throw new ResultError(result);
  }
  return result.data;
}

/**
 * 从接口响应中取出返回的结果, 并返回一个Promise对象
 * @param observable observable
 */
export function getResult<T>(observable: Observable<Result<T>>): Promise<T> {
  return firstValueFrom(
    observable.pipe(
      castError(),
      map(result => checkResult(result))
    )
  );
}

/**
 * 分页参数
 */
export class Paging {

  /**
   * 页码, 从1开始
   */
  pageNumber!: number;

  /**
   * 每页大小
   */
  pageSize!: number;

  public static of(pageNumber: number = 1, pageSize: number = 10) {
    let paging = new Paging();
    paging.pageNumber = pageNumber;
    paging.pageSize = pageSize;
    return paging;
  }

  public toHttpParams() {
    let params = new HttpParams();
    // 后台接口pageNumber是从0开始
    let pageNumber;
    if (this.pageNumber > 0) {
      pageNumber = this.pageNumber - 1;
    } else {
      pageNumber = 0;
    }
    params = params.set("pageNumber", pageNumber.toString())
      .set("pageSize", this.pageSize.toString());
    return params;
  }

}

/**
 * 分页结果
 */
export class PagingData<T> {

  /**
   * 总记录数
   */
  total!: number;

  /**
   * 总页数
   */
  totalPages!: number;

  /**
   * 分页记录
   */
  data!: T[];

}

/**
 * 校验表单是否非法
 * @param form 表单
 */
export function formGroupInvalid(form: FormGroup) {
  // 主动校验
  _formGroupValid(form);
  return form.invalid;
}

/**
 * 将FormGroup中的所有Control标记为Dirty
 * @param formGroup formGroup
 */
function _formGroupValid(formGroup: FormGroup) {
  for (const key in formGroup.controls) {
    const control = formGroup.controls[key];
    if (control instanceof FormArray) {
      _formArrayValid(control);
    } else if (control instanceof FormGroup) {
      _formGroupValid(control);
    } else {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }
}

/**
 * 将FormArray中的所有Control标记为Dirty
 * @param array array
 */
function _formArrayValid(array: FormArray) {
  for (const control of array.controls) {
    if (control instanceof FormArray) {
      _formArrayValid(control);
    } else if (control instanceof FormGroup) {
      _formGroupValid(control);
    } else {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }
}

/**
 * 睡眠指定毫秒数
 * @param millis 毫秒数
 */
export function sleep(millis: number) {
  return new Promise(resolve => {
    setTimeout(resolve, millis);
  });
}

/**
 * 弹出文件选择对话框
 * @param accept 文件筛选
 */
export function selectFiles(accept: string) {
  const input = document.createElement('input');
  input.type = 'file';
  if (accept) {
    input.accept = accept;
  }
  let isResolve = false;
  const promise = new Promise<FileList | undefined>((resolve, reject) => {
    input.onchange = () => {
      isResolve = true;
      if (null == input.files || 0 === input.files?.length) {
        resolve(undefined);
        return;
      }
      resolve(input.files);
    };
    window.addEventListener('focus', () => {
      setTimeout(() => {
        input.remove();
        if (!isResolve) {
          resolve(undefined);
        }
      }, 150);
    }, { once: true });
  });
  input.click();
  return promise;
}
