import {ComponentRef, ElementRef} from "@angular/core";

declare global {
  interface Window {
    onloadTurnstileCallback: () => void;
  }
}

export const Turnstile_SiteKey = '0x4AAAAAAAcinSdXeU5MbE6G';

export interface RenderParameters {

  siteKey?: string;

  /**
   * Optional. A JavaScript callback that is invoked upon success of the challenge.
   * The callback is passed a token that can be validated.
   */
  callback?: (token: string) => void;

  /**
   * Optional. A JavaScript callback that is invoked when a challenge expires.
   */
  "expired-callback"?: (token: string) => void;

  /**
   * Optional. A JavaScript callback that is invoked when an error occurs with the widget.
   */
  "error-callback"?: VoidFunction | undefined;

  /**
   * Optional. A JavaScript callback that is invoked when the Turnstile widget times out.
   */
  "timeout-callback"?: VoidFunction | undefined;

  /**
   * Optional. A JavaScript callback that is invoked before the user is prompted for interactivity.
   */
  "before-interactive-callback"?: VoidFunction | undefined;

  /**
   * Optional. A JavaScript callback that is invoked when the intneractive challenge has been solved.
   */
  "after-interactive-callback"?: VoidFunction | undefined;

  /**
   * Optional. A JavaScript callback that is invoked when the browser is not supported by Turnstile.
   */
  "unsupported-callback"?: VoidFunction | undefined;
}

export function turnstileInit(elementRef: ElementRef, container: string | HTMLElement, params?: RenderParameters) {
  return new Promise((resolve, reject) => {
    window.onloadTurnstileCallback = function () {
      const id = turnstile.render(container, {
        sitekey: params && params.siteKey ? params.siteKey : Turnstile_SiteKey,
        callback: params?.callback,
        "expired-callback": params?.["expired-callback"],
        "error-callback": params?.["error-callback"],
        "timeout-callback": params?.["timeout-callback"],
        "before-interactive-callback": params?.["before-interactive-callback"],
        "after-interactive-callback": params?.["after-interactive-callback"],
        "unsupported-callback": params?.["unsupported-callback"]
      });
      resolve(id);
    }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback';
    script.defer = true;
    elementRef.nativeElement.appendChild(script);
  });
}

export function turnstileReset(container: string | HTMLElement) {
  turnstile.reset(container);
  turnstile.isExpired(container);
}

export function turnstileRemove(container: string | HTMLElement) {
  turnstile.remove(container);
}

export function turnstileIsExpired(container: string | HTMLElement) {
  return turnstile.isExpired(container);
}
