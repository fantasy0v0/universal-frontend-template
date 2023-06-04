import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgProgressState, NgProgressSettings } from '../ng-progress.interface';
import { NgProgress } from '../ng-progress.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ng-progress-component',
  templateUrl: './ng-progress.component.html',
  styleUrls: ['./ng-progress.component.scss'],
  imports: [CommonModule]
})
export class NgProgressComponent implements OnInit, OnDestroy {

  settings?: NgProgressSettings;

  private settingsSubscription: Subscription;

  state: NgProgressState = { active: false };

  private stateSubscription: Subscription;

  constructor(private ngProgress: NgProgress) {
    this.settingsSubscription = this.ngProgress.settings
      .subscribe(settings => this.settings = settings);
    this.stateSubscription = this.ngProgress.state
      .pipe(delay(1)).subscribe(state => this.state = state);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }
}
