import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routeAnimation} from './animations/route';
import {NgProgressComponent} from 'src/ng-progress/component/ng-progress.component';

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
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
