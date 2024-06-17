import {ComponentRef, ElementRef} from "@angular/core";

declare global {
  interface Window {
    onloadTurnstileCallback: () => void;
  }
}

export const Turnstile_SiteKey = '0x4AAAAAAAcinSdXeU5MbE6G';

export function turnstileInit(elementRef: ElementRef, container: string | HTMLElement, siteKey?: string) {
  return new Promise<string>((resolve, reject) => {
    // window.addEventListener('loadTurnstileCallback', function() {
    //   turnstile.render(elementRef.nativeElement, {
    //     sitekey: siteKey ? siteKey : Turnstile_SiteKey,
    //     "error-callback": function() {
    //       reject('error');
    //     },
    //     "timeout-callback": function() {
    //       reject('timeout');
    //     },
    //     callback: function(token) {
    //       console.log(`Challenge Success ${token}`);
    //       resolve(token);
    //     }
    //   });
    // }, { once: true });
    window.onloadTurnstileCallback = function () {
      turnstile.render(container, {
        sitekey: siteKey ? siteKey : Turnstile_SiteKey,
        "error-callback": function() {
          reject('error');
        },
        "timeout-callback": function() {
          reject('timeout');
        },
        callback: function(token) {
          resolve(token);
        }
      });
    }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback';
    script.defer = true;
    elementRef.nativeElement.appendChild(script);
  });
}
