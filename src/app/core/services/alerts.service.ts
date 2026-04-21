import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private toastCtrl: ToastController, private alertController : AlertController) {}

  async crearToast(position: any, message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration: 1000,
      color,
    });

    return toast.present();
  }

  async crearAlerta(titulo: string, mensaje: string, acciones : any[]){
    const alert = await this.alertController.create({
      header : titulo,
      message : mensaje,
      buttons : acciones
    });
    return alert.present();
  }
}
