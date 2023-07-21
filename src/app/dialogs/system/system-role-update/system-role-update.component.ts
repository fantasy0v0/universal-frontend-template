import {Component, Input, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SimpleDataVO} from "../../../services/vo/SimpleDataVO";
import {NzModalRef} from "ng-zorro-antd/modal";
import {formGroupInvalid} from "../../../services/common";
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

  formGroup: FormGroup;

  loading = signal(false);

  @Input()
  data?: SimpleDataVO;

  constructor(private modal: NzModalRef,
              private roleService: SystemRoleService,
              private error: ErrorService,
              private message: NzMessageService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null)
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
