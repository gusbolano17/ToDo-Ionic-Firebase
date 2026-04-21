import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonGrid, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonImg, IonCol, IonRow, IonGrid, IonButtons, IonToolbar, IonHeader, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
