import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private renderer: Renderer2;
  constructor(
    private translate:TranslateService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  initTranslate() {
    this.translate.setDefaultLang('ar');
    this.translate.use('ar');
    this.changeLang('ar');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.dir = lang == 'en' ? 'ltr' : 'rtl';
    // / Dynamically update font family for Arabic language
    const root = document.documentElement;
    if (lang === 'ar') {
      root.dir = 'rtl';
      root.style.setProperty('--ion-font-family', 'var(--ion-font-family-arabic)');
      root.style.setProperty('--ion-font-family-bold', 'var(--ion-font-family-bold-arabic)');
      root.style.setProperty('--ion-font-family-semibold', 'var(--ion-font-family-semibold-arabic)');
      root.style.setProperty('--ion-font-family-medium', 'var(--ion-font-family-medium-arabic)');
      root.style.setProperty('--ion-margin-inline', 'var(--ion-margin-inline-arabic)');
    } else {
      root.style.setProperty('--ion-font-family', '"regular", sans-serif');
      root.style.setProperty('--ion-font-family-bold', '"bold", sans-serif');
      root.style.setProperty('--ion-font-family-semibold', '"semibold", sans-serif');
      root.style.setProperty('--ion-font-family-medium', '"medium", sans-serif');
    }
  }
  getLang() {
    return localStorage.getItem('lang');
  }

  getTranslation(key: string) {
    return this.translate.instant(key);
  }




}
