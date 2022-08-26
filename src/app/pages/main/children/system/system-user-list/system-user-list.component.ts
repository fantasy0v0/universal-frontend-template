import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UniversalUserService} from "../../../../../services/universal-user/universal-user.service";
import {SystemUserVO} from "../../../../../services/universal-user/vo/SystemUserVO";
import {errorMessage, Paging} from "../../../../../services/common";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-system-user-list',
  templateUrl: './system-user-list.component.html',
  styleUrls: ['./system-user-list.component.scss']
})
export class SystemUserListComponent implements OnInit {

  formGroup: FormGroup;

  loading = false;

  paging = Paging.of(1, 10);

  data: SystemUserVO[] = [];

  constructor(private userService: UniversalUserService,
              private message: NzMessageService) {
    this.formGroup = new FormGroup({
      role: new FormControl(-1),
      name: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.onSerach();
  }

  async onSerach() {
    this.loading = true;
    try {
      let role = this.formGroup.get("role")!.value as number | undefined;
      if (-1 === role) {
        role = undefined;
      }
      const name = this.formGroup.get("name")!.value as string;
      const pagingResult = await this.userService.findAll(this.paging, name, role);
      this.data = pagingResult.content;
    } catch (e) {
      const msg = errorMessage(e);
      this.message.error(msg);
    } finally {
      this.loading = false;
    }
  }

}
