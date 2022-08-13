import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* => *', [
    group([
      query(':enter', [
        style({
          position: 'absolute',
          opacity: '0'
        }),
        animate('.3s ease-in', style({
          opacity: 1
        }))
      ], { optional: true }),
      query(':leave', [
        style({
          position: 'absolute',
        }),
        animate('.3s ease-out', style({
          opacity: 0
        }))
      ], { optional: true })
    ])
  ])
]);
