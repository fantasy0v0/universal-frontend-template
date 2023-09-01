import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SystemRoleService} from "../../../services/system/role/system-role.service";
import {SimpleDataVO} from "../../../services/vo/SimpleDataVO";
import {formGroupInvalid} from "../../../services/util";
import {NzModalRef} from "ng-zorro-antd/modal";
import {SystemUserService} from "../../../services/system/user/system-user.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {ErrorService} from "../../../services/error/error.service";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from 'ng-zorro-antd/input';

@Component({
  standalone: true,
  selector: 'app-system-user-add',
  templateUrl: './system-user-add.component.html',
  styleUrls: ['./system-user-add.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule
  ]
})
export class SystemUserAddComponent implements OnInit {

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    role: new FormControl<number | null>(null, Validators.required),
    contactNumber: new FormControl<string | null>(null),
    type: new FormControl(0, Validators.required),
    account: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
  });

  loading = signal(false);

  roles: SimpleDataVO[] = [];

  constructor(private roleService: SystemRoleService,
              private modal: NzModalRef,
              private message: NzMessageService,
              private error: ErrorService,
              private userService: SystemUserService) {
  }

  ngOnInit(): void {
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
    this.loading.set(true);
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
      this.loading.set(false);
    }
  }
}
