import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class I18nService {
  public static defaultUserLang: string = environment.i18n.defaultLang;
  public static chosenUserLang: string;

  static get userLang(): string {
    return (
      this.chosenUserLang ||
      (navigator.language || (navigator as any).userLanguage || this.defaultUserLang).substr(0, 2)
    );
  }
}
