import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SimpleDataVO} from "../../services/vo/SimpleDataVO";
import {NzModalRef} from "ng-zorro-antd/modal";
import {errorMessage, formGroupInvalid} from "../../services/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {UniversalRoleService} from "../../services/universal-role/universal-role.service";

@Component({
  selector: 'app-system-role-update',
  templateUrl: './system-role-update.component.html',
  styleUrls: ['./system-role-update.component.scss']
})
export class SystemRoleUpdateComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;

  @Input()
  data?: SimpleDataVO;

  constructor(private modal: NzModalRef,
              private roleService: UniversalRoleService,
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
    this.loading = true;
    try {
      await this.roleService.saveOrUpdate({
        id: this.data?.id ?? 0,
        name
      });
      this.message.success("操作成功");
      this.modal.close();
    } catch (e) {
      const msg = errorMessage(e);
      this.message.error(msg);
    } finally {
      this.loading = false;
    }
  }
}
