import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UniversalUserService} from "../../../../../services/universal-user/universal-user.service";
import {SystemUserVO} from "../../../../../services/universal-user/vo/SystemUserVO";
import {errorMessage, Paging} from "../../../../../services/common";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {SystemDialogService} from "../../../../../services/dialog/system/system-dialog.service";
import {Subscription} from "rxjs";
import {$loading} from "../../../../../interceptors/my/my.interceptor";
import {ErrorService} from "../../../../../services/error/error.service";
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  standalone: true,
  selector: 'app-system-user-list',
  templateUrl: './system-user-list.component.html',
  styleUrls: ['./system-user-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzSpaceModule,
    NzButtonModule,
    NzSelectModule,
    NzBadgeModule,
    NzIconModule
  ]
})
export class SystemUserListComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  loading = false;

  paging = Paging.of(1, 10);

  total = 0;

  data: SystemUserVO[] = [];

  loadingSubscription: Subscription;

  constructor(private userService: UniversalUserService,
              private modal: NzModalService,
              private dialogService: SystemDialogService,
              private error: ErrorService,
              private message: NzMessageService) {
    this.formGroup = new FormGroup({
      role: new FormControl(-1),
      name: new FormControl(null)
    });
    this.loadingSubscription = $loading.toObservable().subscribe(value => {
      this.loading = value;
    });
  }

  ngOnInit(): void {
    this.onSearch();
  }

  async onSearch() {
    try {
      let role = this.formGroup.get("role")!.value as number | undefined;
      if (-1 === role) {
        role = undefined;
      }
      const name = this.formGroup.get("name")!.value as string;
      const pagingResult = await this.userService.findAll(this.paging, name, role);
      this.total = pagingResult.total;
      this.data = pagingResult.content;
    } catch (e) {
      this.error.process(e);
    }
  }

  async restPassword(item: SystemUserVO) {
    try {
      const newPassword = await this.userService.restPassword(item.id, 0);
      this.modal.success({
        nzTitle: "密码重置成功",
        nzContent: `新密码为: ${newPassword}`
      });
    } catch (e) {
      this.error.process(e);
    }
  }

  async disable(item: SystemUserVO) {
    try {
      await this.userService.disable(item.id);
      this.message.success("操作成功");
    } catch (e) {
      this.error.process(e);
    }
  }

  async enable(item: SystemUserVO) {
    try {
      await this.userService.enable(item.id);
      this.message.success("操作成功");
    } catch (e) {
      this.error.process(e);
    }
  }

  async toAddUser() {
    const result = await this.dialogService.systemUserAdd();
    if (result) {
      this.onSearch();
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
