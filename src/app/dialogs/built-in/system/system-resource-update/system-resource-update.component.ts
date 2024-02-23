import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {BaseComponent} from "../../../../util/base.component";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {SimpleDataVO} from "../../../../services/vo/SimpleDataVO";
import {SystemResourceUpdateConfig} from "./vo/SystemResourceUpdateConfig";

@Component({
  selector: 'app-system-resource-update',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzFormModule, NzGridModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './system-resource-update.component.html',
  styleUrls: ['./system-resource-update.component.scss']
})
export class SystemResourceUpdateComponent extends BaseComponent {

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    flag: new FormControl<string | undefined>(undefined),
    remarks: new FormControl<string | undefined>(undefined)
  });

  id: number;

  parent?: SimpleDataVO;

  constructor(@Inject(NZ_MODAL_DATA)
              public config: SystemResourceUpdateConfig) {
    super();
    this.id = this.config.id;
    this.parent = this.config.parent;
    this.formGroup.controls.name.setValue(this.config.name);
    this.formGroup.controls.flag.setValue(this.config.flag);
    this.formGroup.controls.remarks.setValue(this.config.remarks);
  }

  submitForm() {

  }
}
