import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {subRouteAnimation} from "../../animations/route";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    subRouteAnimation
  ]
})
export class MainComponent implements OnInit {

  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
