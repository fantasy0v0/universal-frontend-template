import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Paging} from "../../../../../services/common";
import {SystemRoleService} from "../../../../../services/system/role/system-role.service";
import {SimpleDataVO} from "../../../../../services/vo/SimpleDataVO";
import {NzMessageService} from "ng-zorro-antd/message";
import {SystemDialogService} from "../../../../../services/dialog/system/system-dialog.service";
import {ErrorService} from "../../../../../services/error/error.service";
import {CommonModule} from '@angular/common';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

@Component({
  standalone: true,
  selector: 'app-system-role-list',
  templateUrl: './system-role-list.component.html',
  styleUrls: ['./system-role-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzPopconfirmModule
  ]
})
export class SystemRoleListComponent implements OnInit {

  formGroup: FormGroup;

  loading = signal(false);

  data: SimpleDataVO[] = [];

  constructor(private roleService: SystemRoleService,
              private dialogService: SystemDialogService,
              private error: ErrorService,
              private message: NzMessageService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.onSearch();
  }

  async onSearch() {
    this.loading.set(true);
    try {
      const name = this.formGroup.get("name")!.value as string;
      this.data = await this.roleService.findAll(name);
    } catch (e) {
      this.error.process(e);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteRole(item: SimpleDataVO) {
    this.loading.set(true);
    try {
      await this.roleService.deleteById(item.id);
      this.message.success("删除成功");
      this.onSearch();
    } catch (e) {
      this.error.process(e);
    } finally {
      this.loading.set(false);
    }
  }

  async saveOrUpdate(data?: SimpleDataVO) {
    await this.dialogService.systemRoleSaveOrUpdate(data);
    this.onSearch();
  }

}
