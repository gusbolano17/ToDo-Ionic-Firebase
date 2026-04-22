import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuPage } from './shared/menu/menu.page';
import { RemoteConfigService } from './core/services/remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuPage],
})
export class AppComponent implements OnInit {
  constructor(private remoteConfigService: RemoteConfigService) {}

  ngOnInit() {
    this.remoteConfigService.loadConfig();
  }
}
