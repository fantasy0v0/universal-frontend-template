import {Component, Inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleDataVO} from "../../../services/vo/SimpleDataVO";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {formGroupInvalid} from "../../../services/util";
import {NzMessageService} from "ng-zorro-antd/message";
import {SystemRoleService} from "../../../services/system/role/system-role.service";
import {ErrorService} from "../../../services/error/error.service";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';

@Component({
  standalone: true,
  selector: 'app-system-role-update',
  templateUrl: './system-role-update.component.html',
  styleUrls: ['./system-role-update.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class SystemRoleUpdateComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  loading = signal(false);

  constructor(private modal: NzModalRef,
              private roleService: SystemRoleService,
              private error: ErrorService,
              private message: NzMessageService,
              @Inject(NZ_MODAL_DATA)
              public data: SimpleDataVO) {
  }

  ngOnInit(): void {
    if (null != this.data) {
      this.formGroup.controls.name.setValue(this.data.name);
    }
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }

    const name = this.formGroup.getRawValue().name!;
    this.loading.set(true);
    try {
      await this.roleService.saveOrUpdate({
        id: this.data?.id ?? 0,
        name
      });
      this.message.success("操作成功");
      this.modal.close();
    } catch (e) {
      this.error.process(e);
    } finally {
      this.loading.set(false);
    }
  }
}
