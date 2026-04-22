import { Call } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private modalRef : HTMLIonModalElement | null = null;
  
  constructor(private modalController: ModalController){}

  async abrirModal(componente : any, props : any = {}) {
    this.modalRef = await this.modalController.create({
      component : componente,
      componentProps : props
    });
    return await this.modalRef.present();
  }

  async postCierreModal(callback : CallableFunction){
    if (this.modalRef){
      await this.modalRef.onDidDismiss().then(() => {
        this.modalRef = null;
        callback();
      });
    }
  }

  async cerrarModal(){
    return await this.modalController.dismiss();
  }

}
