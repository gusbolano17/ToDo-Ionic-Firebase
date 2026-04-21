import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonItem,
  IonIcon,
  IonList,
  IonLabel,
  MenuController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkbox, folder } from 'ionicons/icons';
import { RemoteConfigService } from 'src/app/core/services/remote-config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonLabel,
    IonItem,
    IonIcon,
    IonMenu,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    RouterLink,
  ],
})
export class MenuPage implements OnInit {
  constructor(private menuController: MenuController, public remoteConfig: RemoteConfigService) {
    addIcons({ checkbox, folder });
  }

  async closeMenu(){
    await this.menuController.close();
  }

  ngOnInit() {}
}
