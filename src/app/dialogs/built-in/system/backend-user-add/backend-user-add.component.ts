import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendRoleService} from "../../../../services/built-in/system/role/backend-role.service";
import {SimpleDataVO} from "../../../../services/built-in/vo/SimpleDataVO";
import {formGroupInvalid} from "../../../../services/built-in/util";
import {NzModalRef} from "ng-zorro-antd/modal";
import {BackendUserService} from "../../../../services/built-in/system/user/backend-user.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from 'ng-zorro-antd/input';
import {BaseComponent} from "../../../../util/base.component";

@Component({
  standalone: true,
  selector: 'app-backend-user-add',
  templateUrl: './backend-user-add.component.html',
  styleUrls: ['./backend-user-add.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule
  ]
})
export class BackendUserAddComponent extends BaseComponent {

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    role: new FormControl<number | null>(null, Validators.required),
    contactNumber: new FormControl<string | null>(null),
    type: new FormControl(0, Validators.required),
    account: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  roles: SimpleDataVO[] = [];

  private roleService = inject(BackendRoleService);

  private modal = inject(NzModalRef);

  private message = inject(NzMessageService);

  private userService = inject(BackendUserService);

  override ngOnInit(): void {
    this.roleService.findAll(null).then(result => {
      this.roles = result;
      if (this.roles.length > 0) {
        this.formGroup.controls.role.setValue(this.roles[0].id);
      }
    });
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    const name = this.formGroup.getRawValue().name!;
    const role = this.formGroup.getRawValue().role!;
    const contactNumber = this.formGroup.getRawValue().contactNumber;
    const type = this.formGroup.getRawValue().type!;
    const account = this.formGroup.getRawValue().account!;
    const password = this.formGroup.getRawValue().password!;
    this.startLoading();
    try {
      await this.userService.addUser({
        name, role, contactNumber, type,
        account, password
      });
      this.message.success("添加成功");
      this.modal.close(true);
    } catch (e) {
      this.error.process(e);
    } finally {
      this.stopLoading();
    }
  }
}
