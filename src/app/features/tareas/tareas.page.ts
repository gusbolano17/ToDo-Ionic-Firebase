import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  ModalController,
  IonButton,
  IonItem,
  IonCheckbox,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { TareaModalPage } from 'src/app/features/tareas/tarea-modal/tarea-modal.page';
import { Tarea } from '../../core/models/tareas.model';
import { TareasService } from './tareas.service';
import { AlertsService } from 'src/app/core/services/alerts.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    IonFabButton,
    IonFab,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCheckbox,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TareasPage implements OnInit {
  public tareas: Tarea[] = [];

  constructor(
    private modalController: ModalController,
    private tareaService: TareasService,
    private alertService: AlertsService,
  ) {
    addIcons({ add });
  }

  async ngOnInit() {
    await this.listarTareas();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: TareaModalPage,
    });

    modal.present();

    modal.onDidDismiss().then(() => {
      this.listarTareas();
    });
  }

  async listarTareas() {
    this.tareas = await this.tareaService.listarTareas();
  }

  async checkedTarea(tarea: Tarea) {
    tarea.completado = !tarea.completado;
    await this.tareaService.editarTarea(tarea);
  }

  async editarTarea(tarea: Tarea) {
    const modal = await this.modalController.create({
      component: TareaModalPage,
      componentProps: {
        tareaEdit: tarea,
      },
    });

    modal.present();

    modal.onDidDismiss().then(() => {
      this.listarTareas();
    });
  }

  async eliminarTarea(id: string) {
    try {
      await this.tareaService.eliminarTarea(id);
      await this.listarTareas();
      this.alertService.crearToast(
        'top',
        'Tarea eliminada con exito',
        'warning',
      );
    } catch (error) {
      this.alertService.crearToast(
        'top',
        'Error al eliminar la tarea',
        'danger',
      );
    }
  }
}
