import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routeAnimation} from './animations/route';
import {NgProgressComponent} from 'src/ng-progress/component/ng-progress.component';
import {DeviceService} from "./services/built-in/device/device.service";
import {
  LocalSettingService
} from "./services/built-in/system/setting/local-setting.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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

  private destroyRef = inject(DestroyRef);

  private localSettingService = inject(LocalSettingService);

  ngOnInit() {
    const deviceId = this.deviceService.current();
    if (null == deviceId) {
      this.deviceService.create();
    }
    this.localSettingService.setting().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(setting => {
      console.log("setting:", setting);
    });
    setTimeout(() => {
      this.localSettingService.updateColor("orange");
    }, 8000);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }


}
