import {getCookie, setCookie} from '@tanstack/react-start/server';
import frontendCookie from 'js-cookie';

export class Cookie {

  set(name: string, value:string) {
    if (typeof window === 'undefined') {
      return setCookie(name, value);
    }
    frontendCookie.set(name, value);

  }
  get(name: string): string | null {
    if (typeof window === 'undefined') {
      return getCookie(name) ?? null;
    }
    return frontendCookie.get(name) ?? null;
  };
}
