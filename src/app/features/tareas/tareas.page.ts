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
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonCheckbox,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, folderOpen, menu } from 'ionicons/icons';
import { TareaModalPage } from 'src/app/features/tareas/tarea-modal/tarea-modal.page';
import { Tarea } from '../../core/models/tareas.model';
import { TareasService } from './tareas.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { Categoria } from 'src/app/core/models/categorias.model';
import { CategoriasService } from '../categorias/categorias.service';

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
    IonButtons,
    IonMenuButton,
    IonInfiniteScroll,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TareasPage implements OnInit {
  public tareas: Tarea[] = [];
  private tareasOriginal: Tarea[] = [];
  public categorias: Categoria[] = [];

  private filtros = {
    buscar: '',
    categoria: 'todas',
    estado: 'todos'
  };

  constructor(
    private modalController: ModalController,
    private tareaService: TareasService,
    private categoriaService: CategoriasService,
    private alertService: AlertsService,
  ) {
    addIcons({ folderOpen, add, menu });
  }

  async ngOnInit() {
    await this.listarTareas();
    await this.listarCategorias();
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
    this.tareasOriginal = [...this.tareas];
  }

  async listarCategorias() {
    this.categorias = await this.categoriaService.listarCategorias();
  }

  async buscarTarea(event: any) {
    this.filtros.buscar = event.target.value?.toLowerCase() || '';
    this._aplicarFiltros();
  }

  async filtrarTareaCategoria(event: any) {
    this.filtros.categoria = event.target.value || 'todas';
    this._aplicarFiltros();
  }

  async filtrarTareaEstado(event: any) {
    this.filtros.estado = event.target.value || 'todas';
    this._aplicarFiltros();
  }

  limpiarFiltros() {
    this.filtros = {
      buscar: '',
      categoria: 'todas',
      estado: 'todas'
    };
    this.tareas = [...this.tareasOriginal];
  }

  private _aplicarFiltros() {
    this.tareas = this.tareasOriginal.filter(tarea => {
      const matchBuscar = !this.filtros.buscar || 
        tarea.titulo.toLowerCase().includes(this.filtros.buscar);
      
      const matchCategoria = this.filtros.categoria === 'todas' || 
        tarea.categoriaId?.id === this.filtros.categoria;
      
      const matchEstado = this.filtros.estado === 'todas' || 
        (this.filtros.estado === 'completadas' && tarea.completado) ||
        (this.filtros.estado === 'pendientes' && !tarea.completado);
      
      return matchBuscar && matchCategoria && matchEstado;
    });
  }

  async cargarMasTareas(e: InfiniteScrollCustomEvent) {
    await this.listarTareas();
    setTimeout(() => {
      (e.target as HTMLIonInfiniteScrollElement).complete();
    });
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
