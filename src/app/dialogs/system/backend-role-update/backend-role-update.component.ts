import {Component, inject, Inject, Optional} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleDataVO} from "../../../services/vo/SimpleDataVO";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";
import {formGroupInvalid} from "../../../services/util";
import {NzMessageService} from "ng-zorro-antd/message";
import {BackendRoleService} from "../../../services/system/role/backend-role.service";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {BaseComponent} from "../../../util/base.component";

@Component({
  standalone: true,
  selector: 'app-backend-role-update',
  templateUrl: './backend-role-update.component.html',
  styleUrls: ['./backend-role-update.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class BackendRoleUpdateComponent extends BaseComponent {

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  private modal = inject(NzModalRef);

  private roleService = inject(BackendRoleService);

  private message = inject(NzMessageService);

  constructor(@Optional()
              @Inject(NZ_MODAL_DATA)
              public data?: SimpleDataVO) {
    super();
  }

  override ngOnInit(): void {
    if (null != this.data) {
      this.formGroup.controls.name.setValue(this.data.name);
    }
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }

    const name = this.formGroup.getRawValue().name!;
    this.startLoading();
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
      this.stopLoading();
    }
  }
}
