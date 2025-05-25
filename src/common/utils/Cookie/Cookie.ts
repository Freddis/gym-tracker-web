import frontendCookie from 'js-cookie';
import {getCookie, setCookie} from '@tanstack/react-start/server?server';

export class Cookie {

  set(name: string, value:string) {
    if (import.meta.env.SSR) {
      return setCookie(name, value);
    }
    frontendCookie.set(name, value);

  }
  get(name: string): string | null {
    if (import.meta.env.SSR) {
      return getCookie(name) ?? null;
    }
    return frontendCookie.get(name) ?? null;
  };
}
