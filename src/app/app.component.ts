import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routeAnimation} from './animations/route';
import {NgProgressComponent} from 'src/ng-progress/component/ng-progress.component';
import {DeviceService} from "./services/built-in/device/device.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimation
  ],
  imports: [
    RouterOutlet,
    NgProgressComponent
  ]
})
export class AppComponent implements OnInit {

  private deviceService = inject(DeviceService);

  ngOnInit() {
    const deviceId = this.deviceService.current();
    if (null == deviceId) {
      this.deviceService.create();
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }


}
