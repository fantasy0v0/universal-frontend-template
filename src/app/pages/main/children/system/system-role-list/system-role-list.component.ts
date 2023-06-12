import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Paging} from "../../../../../services/common";
import {UniversalRoleService} from "../../../../../services/universal-role/universal-role.service";
import {SimpleDataVO} from "../../../../../services/vo/SimpleDataVO";
import {NzMessageService} from "ng-zorro-antd/message";
import {SystemDialogService} from "../../../../../services/dialog/system/system-dialog.service";
import {$loading} from "../../../../../interceptors/my/my.interceptor";
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

  loading = $loading.toObservable();

  paging = Paging.of(1, 10);

  total = 0;

  data: SimpleDataVO[] = [];

  constructor(private roleService: UniversalRoleService,
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
    try {
      const name = this.formGroup.get("name")!.value as string;
      const pagingResult = await this.roleService.findAll(this.paging, name);
      this.total = pagingResult.total;
      this.data = pagingResult.content;
    } catch (e) {
      this.error.process(e);
    }
  }

  async deleteRole(item: SimpleDataVO) {
    try {
      await this.roleService.deleteById(item.id);
      this.message.success("删除成功");
      this.onSearch();
    } catch (e) {
      this.error.process(e);
    }
  }

  async saveOrUpdate(data?: SimpleDataVO) {
    await this.dialogService.systemRoleSaveOrUpdate(data);
    this.onSearch();
  }

}
