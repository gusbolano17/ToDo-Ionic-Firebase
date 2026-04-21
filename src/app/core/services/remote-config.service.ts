import { Injectable } from '@angular/core';
import {
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from '@angular/fire/remote-config';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {
  enableCategories: boolean = false;

  constructor(
    private remoteConfig: RemoteConfig,
    private alertService: AlertsService,
  ) {}

  async loadConfig() {
    try {
      await fetchAndActivate(this.remoteConfig);

      const value = getValue(this.remoteConfig, 'enable_categories');
      this.enableCategories = value.asString() === 'true';
    } catch (error) {
      this.alertService.crearToast(
        'top',
        'Error al cargar la configuración remota',
        'danger',
      );
    }
  }
}
