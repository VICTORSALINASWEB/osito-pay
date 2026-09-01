import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEsPe)


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    importProvidersFrom(IonicStorageModule.forRoot()),
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ],
});