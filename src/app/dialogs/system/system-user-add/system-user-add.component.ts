import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UniversalRoleService} from "../../../services/universal-role/universal-role.service";
import {SimpleDataVO} from "../../../services/vo/SimpleDataVO";
import {errorMessage, formGroupInvalid} from "../../../services/common";
import {NzModalRef} from "ng-zorro-antd/modal";
import {UniversalUserService} from "../../../services/universal-user/universal-user.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-system-user-add',
  templateUrl: './system-user-add.component.html',
  styleUrls: ['./system-user-add.component.scss']
})
export class SystemUserAddComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;

  roles: SimpleDataVO[] = [];

  constructor(private roleService: UniversalRoleService,
              private modal: NzModalRef,
              private message: NzMessageService,
              private userService: UniversalUserService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      contactNumber: new FormControl(null),
      type: new FormControl(0, Validators.required),
      account: new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.roleService.findAll().then(result => {
      this.roles = result.content;
      if (this.roles.length > 0) {
        this.formGroup.get("role")!.setValue(this.roles[this.roles.length - 1].id);
      }
    }).finally(() => {
      this.loading = false;
    });
  }

  async submitForm() {
    if (formGroupInvalid(this.formGroup)) {
      return;
    }
    this.loading = true;
    const name = this.formGroup.get("name")!.value as string;
    const role = this.formGroup.get("role")!.value as number;
    const contactNumber = this.formGroup.get("contactNumber")!.value as string;
    const type = this.formGroup.get("type")!.value as number;
    const account = this.formGroup.get("account")!.value as string;
    const password = this.formGroup.get("password")!.value as string;
    try {
      await this.userService.addUser({
        name, role, contactNumber, type,
        account, password
      });
      this.message.success("添加成功");
      this.modal.close(true);
    } catch (e) {
      const msg = errorMessage(e);
      this.message.error(msg);
    } finally {
      this.loading = false;
    }
  }
}
