export class CubicBezier {
  p0: number;
  p1: number;
  p2: number;
  p3: number;

  constructor(p0: number, p1: number, p2: number, p3: number) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  toString() {
    return `cubic-bezier(${this.p0}, ${this.p1}, ${this.p2}, ${this.p3})`;
  }
}

export type EasingType = 'linear'| 'ease'| 'ease-in' | 'ease-out' | 'ease-in-out' | CubicBezier;

export interface NgProgressSettings {
  minimum: number,
  easing: EasingType,
  positionUsing: 'translate3d' | 'translate' | '',
  speed: number,
  trickle: boolean,
  trickleRate: number,
  trickleSpeed: number,
  showSpinner: boolean,
  router: boolean,
  http: boolean,
  color: string
}

export interface Style {
  [key: string]: string
}

export interface NgProgressState {
  active: boolean,
  style?: Style
}
