import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzTreeModule} from "ng-zorro-antd/tree";
import {SystemResourceService} from "../../../../../services/system/resource/system-resource.service";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-system-resource-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTreeModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './system-resource-list.component.html',
  styleUrls: ['./system-resource-list.component.scss']
})
export class SystemResourceListComponent implements OnInit {

  private resourceService = inject(SystemResourceService)

  ngOnInit(): void {

  }

}
