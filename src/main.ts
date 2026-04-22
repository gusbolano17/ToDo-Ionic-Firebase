import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { environment } from './environments/environment';
import { environment as prod } from './environments/environment.prod';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    //Ionic storage para manejar persistencia de datos
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '_mydb',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      }),
    ),
    provideFirebaseApp(() =>
      initializeApp(prod.firebase),
    ),
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig();
      remoteConfig.settings.minimumFetchIntervalMillis = 10000;
      return remoteConfig;
    })
  ],
});
