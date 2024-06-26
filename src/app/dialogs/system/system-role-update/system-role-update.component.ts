import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SimpleDataVO} from "../../../services/vo/SimpleDataVO";
import {NzModalRef} from "ng-zorro-antd/modal";
import {errorMessage, formGroupInvalid} from "../../../services/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {UniversalRoleService} from "../../../services/universal-role/universal-role.service";
import {$loading} from "../../../interceptors/my.interceptor";
import {Subscription} from "rxjs";
import {ErrorService} from "../../../services/error/error.service";

@Component({
  selector: 'app-system-role-update',
  templateUrl: './system-role-update.component.html',
  styleUrls: ['./system-role-update.component.scss']
})
export class SystemRoleUpdateComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  loading = false;

  @Input()
  data?: SimpleDataVO;

  loadingSubscription: Subscription;

  constructor(private modal: NzModalRef,
              private roleService: UniversalRoleService,
              private error: ErrorService,
              private message: NzMessageService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null)
    });
    this.loadingSubscription = $loading.toObservable().subscribe(value => {
      this.loading = value;
    });
  }

  ngOnInit(): void {
    if (null != this.data) {
      this.formGroup.get("name")!.setValue(this.data.name);
    }
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }

    const name = this.formGroup.get("name")!.value as string;
    try {
      await this.roleService.saveOrUpdate({
        id: this.data?.id ?? 0,
        name
      });
      this.message.success("操作成功");
      this.modal.close();
    } catch (e) {
      this.error.process(e);
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
