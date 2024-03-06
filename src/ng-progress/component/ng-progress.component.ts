import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {NgProgressSettings, NgProgressState} from '../ng-progress.interface';
import {NgProgress} from '../ng-progress.service';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'ng-progress-component',
  templateUrl: './ng-progress.component.html',
  styleUrls: ['./ng-progress.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgProgressComponent implements OnInit, OnDestroy {

  settings = signal<NgProgressSettings | undefined>(undefined);

  private settingsSubscription: Subscription;

  state  = signal<NgProgressState>({ active: false });

  private stateSubscription: Subscription;

  constructor(private ngProgress: NgProgress) {
    this.settingsSubscription = this.ngProgress.settings
      .subscribe(settings => this.settings.set(settings));
    this.stateSubscription = this.ngProgress.state
      .pipe(delay(1)).subscribe(state => this.state.set(state));
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }
}
