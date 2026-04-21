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
      initializeApp({
        apiKey: environment.API_KEY_FIREBASE,
        authDomain: environment.FIREBASE_AUTH_DOMAIN,
        projectId: environment.FIREBASE_PROJECT_ID,
        storageBucket: environment.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
        appId: environment.FIREBASE_APP_ID,
      }),
    ),
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig();
      remoteConfig.settings.minimumFetchIntervalMillis = 10000;
      return remoteConfig;
    })
  ],
});
