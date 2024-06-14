import {ElementRef, signal} from "@angular/core";

export const turnstile_SiteKey = signal('0x4AAAAAAAcinSdXeU5MbE6G').asReadonly();

export function turnstileInit(elementRef: ElementRef) {
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  script.defer = true;
  elementRef.nativeElement.appendChild(script);
}
