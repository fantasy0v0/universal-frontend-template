import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* => *', [
    group([
      query(':enter', [
        style({
          position: 'absolute',
          opacity: 0
        }),
        animate('.3s ease-out', style({
          opacity: 1
        }))
      ], { optional: true }),
      query(':leave', [
        style({
          position: 'absolute',
          opacity: 1
        }),
        animate('.3s ease-out', style({
          opacity: 0
        }))
      ], { optional: true })
    ])
  ])
]);

export const subRouteAnimation = trigger('subRouteAnimation', [
  transition('* => *', [
    group([
      query(':enter', [
        style({
          position: 'absolute',
          opacity: '0',
          left: '1.5rem'
        }),
        animate('.3s ease-out', style({
          opacity: 1,
          left: '.5rem'
        }))
      ], { optional: true }),
      query(':leave', [
        style({
          position: 'absolute',
          left: '.5rem'
        }),
        animate('.3s ease-out', style({
          opacity: 0,
          left: '-2rem'
        }))
      ], { optional: true })
    ])
  ])
]);
