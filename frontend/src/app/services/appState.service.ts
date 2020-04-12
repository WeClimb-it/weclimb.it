// TODO: Instead of using hard-coded string as keys, provide a enum or something

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppStoreService {
  private readonly state: { [key: string]: BehaviorSubject<unknown> } = {};

  /**
   *
   */
  getProperty(key: string): unknown {
    return this.state[key] ? this.state[key].getValue() : undefined;
  }

  /**
   *
   */
  watchProperty(key: string, defaultValue?: unknown): Observable<unknown> {
    if (!this.state[key]) {
      this.state[key] = new BehaviorSubject<unknown>(defaultValue || null);
    }
    return this.state[key].asObservable();
  }

  /**
   *
   */
  setProperty(key: string, value: unknown): void {
    if (this.state[key]) {
      this.state[key].next(value);
    } else {
      this.state[key] = new BehaviorSubject<unknown>(value);
    }
  }
}
