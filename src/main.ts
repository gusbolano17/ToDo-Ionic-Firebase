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
        apiKey: 'AIzaSyD8eMRJhYtu8_0wimGrjwNU7ReVU1q8yX4',
        authDomain: 'webappfb-fa132.firebaseapp.com',
        projectId: 'webappfb-fa132',
        storageBucket: 'webappfb-fa132.firebasestorage.app',
        messagingSenderId: '720360160052',
        appId: '1:720360160052:web:2d0adda00881bb43db0361',
      }),
    ),
    provideRemoteConfig(() => {
      const remoteConfig = getRemoteConfig();
      remoteConfig.settings.minimumFetchIntervalMillis = 10000;
      return remoteConfig;
    })
  ],
});
