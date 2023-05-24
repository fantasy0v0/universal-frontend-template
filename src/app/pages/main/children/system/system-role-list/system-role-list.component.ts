import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {errorMessage, Paging} from "../../../../../services/common";
import {UniversalRoleService} from "../../../../../services/universal-role/universal-role.service";
import {SimpleDataVO} from "../../../../../services/vo/SimpleDataVO";
import {NzMessageService} from "ng-zorro-antd/message";
import {SystemDialogService} from "../../../../../services/dialog/system/system-dialog.service";
import {$loading} from "../../../../../interceptors/my.interceptor";
import {Subscription} from "rxjs";
import {ErrorService} from "../../../../../services/error/error.service";

@Component({
  selector: 'app-system-role-list',
  templateUrl: './system-role-list.component.html',
  styleUrls: ['./system-role-list.component.scss']
})
export class SystemRoleListComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  loading = false;

  paging = Paging.of(1, 10);

  total = 0;

  data: SimpleDataVO[] = [];

  loadingSubscription: Subscription;

  constructor(private roleService: UniversalRoleService,
              private dialogService: SystemDialogService,
              private error: ErrorService,
              private message: NzMessageService) {
    this.formGroup = new FormGroup({
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

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
