import { Injectable } from '@angular/core';
import { NgProgressSettings, NgProgressState, Style, EasingType } from './ng-progress.interface';
import { BehaviorSubject, Observable, timer } from 'rxjs';

const queue = (function () {
  const pending: any[] = [];

  function next() {
    let fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }

  return function (fn: (next: () => void) => void) {
    pending.push(fn);
    if (pending.length == 1) next();
  };
})();

export const defaultSettings: NgProgressSettings = {
  minimum: 0.08,
  easing: 'ease',
  positionUsing: '',
  speed: 300,
  trickle: true,
  trickleRate: 0.02,
  trickleSpeed: 800,
  showSpinner: true,
  router: false,
  http: true,
  color: '#40a9ff'
}

@Injectable({
  providedIn: 'root'
})
export class NgProgress {

  readonly version = '0.2.0'

  private _settings: BehaviorSubject<NgProgressSettings>
  settings: Observable<NgProgressSettings>

  private _state: BehaviorSubject<NgProgressState>
  state: Observable<NgProgressState>

  private active = false;
  private perc = 0;

  constructor() {
    this._settings = new BehaviorSubject<NgProgressSettings>(defaultSettings);
    this.settings = this._settings.asObservable();
    this._state = new BehaviorSubject<NgProgressState>({ active: this.active });
    this.state = this._state.asObservable();
  }

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  configure(settings: NgProgressSettings) {
    this._settings.next({ ...this._settings.getValue(), ...settings});
  }

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */
  set(n: number): NgProgress {
    if (!this.isStarted()) {
      this._state.next({
        active: this.active = true,
        style: this.barPositionCSS(
          0, this._settings.getValue().speed,
          this._settings.getValue().easing)
      });
    }
    this.perc = this.clamp(n, this._settings.getValue().minimum, 1);

    queue((next) => {
      const speed = this._settings.getValue().speed;
      if (this.perc !== 1) {
        timer(speed).subscribe(() => {
          this.render();
          next();
        });
        return;
      }

      let style = {
        'transition': 'none',
        'opacity': '1'
      };
      this.render(style);
      timer(speed).subscribe(() => {
        style.transition = `all ${speed}ms linear`;
        style.opacity = '0';
        this.render(style);
        timer(speed).subscribe(() => {
          this.remove();
        });
      });
    });
    return this;
  }

  isStarted(): boolean {
    return this.active;
  }

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  start() {
    if (!this.isStarted()) {
      this._state.next({
        active: this.active = true,
        style: this.barPositionCSS(
          0, this._settings.getValue().speed,
          this._settings.getValue().easing)
      });
      this.set(0);
    }
    let work = () => {
      timer(this._settings.getValue().trickleSpeed).subscribe(() => {
        if (!this.isStarted()) return;
        this.trickle();
        work();
      });
    };
    work();
  }


  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */
  done(force?: boolean): NgProgress {
    if (!force && !this.isStarted()) {
      return this;
    }
    return this.inc(0.3 + 0.5 * Math.random()).set(1);
  }

  /**
   * Increments by a random amount.
   */
  inc(amount?: number): NgProgress {
    if (!this.isStarted()) {
      this.start();
      return this;
    }
    let n = this.perc;
    if (amount == null) {
      amount = (1 - n) * this.clamp(Math.random() * n, 0.1, 0.95);
    }
    n = this.clamp(n + amount, 0, 0.994);
    return this.set(n);
  }

  private trickle(): NgProgress {
    return this.inc(Math.random() * this._settings.getValue().trickleRate);
  }

  /**
   * Helpers
   */

  private clamp(n: number, min: number, max: number) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  private render(style?: Style) {
    let positionUsing: string = this._settings.getValue().positionUsing;
    if (positionUsing === '') {
      positionUsing = this.getPositioningCSS();
    }
    style = style ? style : {};
    this._state.next({
      active: this.isStarted(),
      style: { ...this._state.getValue().style,
        ...this.barPositionCSS(
          this.perc, this._settings.getValue().speed,
          this._settings.getValue().easing),
        ...style
      }});
  }

  /**
   * Removes the element. Opposite of render().
   */

  private remove () {
    this.active = false;
    this.perc = 0;
    this._state.next({
      active: this.active,
      style: {}
    });
  };

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  private toBarPerc(n: number) {
    return (-1 + n) * 100;
  }

  /**
   * Determine which positioning CSS rule to use.
   */

  private getPositioningCSS() {
    // Sniff on document.body.style
    let bodyStyle = document.body.style;

    // Sniff prefixes
    let vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
      ('MozTransform' in bodyStyle) ? 'Moz' :
        ('msTransform' in bodyStyle) ? 'ms' :
          ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  }

  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  private barPositionCSS(n: number, speed: number, ease: EasingType): Style {
    let positionUsing = this._settings.getValue().positionUsing;
    let style:Style = {};

    if (positionUsing === 'translate3d') {
      style['transform'] = 'translate3d(' + this.toBarPerc(n) + '%,0,0)';
    } else if (positionUsing === 'translate') {
      style['transform'] = 'translate(' + this.toBarPerc(n) + '%,0)';
    } else {
      style['margin-left'] = this.toBarPerc(n) + '%';
    }

    style['transition'] = `all ${speed}ms ${ease}`;
    return style;
  }
}
