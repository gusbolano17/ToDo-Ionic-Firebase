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
import { ModalService } from 'src/app/core/services/modal.service';

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
  public categorias: Categoria[] = [];

  private pagina: number = 1;
  private limite: number = 10;
  public hasMore: boolean = true;

  private filtros = {
    buscar: '',
    categoria: 'todas',
    estado: 'todos',
  };

  constructor(
    private modalService: ModalService,
    private tareaService: TareasService,
    private categoriaService: CategoriasService,
    private alertService: AlertsService,
  ) {
    addIcons({ folderOpen, add, menu });
  }

  async ngOnInit() {
    await this.listarTareas(true);
    await this.listarCategorias();
  }

  async ionViewWillEnter() {
    await this.listarTareas(true);
    await this.listarCategorias();
  }

  async openModal() {
    await this.modalService.abrirModal(TareaModalPage);
    await this.modalService.postCierreModal(() => {
      this._recargar();
    });
  }

  async listarTareas(reset: boolean = false) {
    if (reset) {
      this.pagina = 1;
      this.tareas = [];
    }

    const resultado = await this.tareaService.listarTareasPaginadas(
      this.pagina,
      this.limite,
    );

    if (reset) {
      this.tareas = resultado.data;
    } else {
      this.tareas = [...this.tareas, ...resultado.data];
    }

    this.hasMore = resultado.hasMore;
    if (resultado.hasMore) {
      this.pagina++;
    }
  }

  async listarCategorias() {
    this.categorias = await this.categoriaService.listarCategorias();
  }

  async buscarTarea(event: any) {
    this.filtros.buscar = event.target.value?.toLowerCase() || '';
    await this._aplicarFiltros();
  }

  async filtrarTareaCategoria(event: any) {
    this.filtros.categoria = event.target.value || 'todas';
    await this._aplicarFiltros();
  }

  async filtrarTareaEstado(event: any) {
    this.filtros.estado = event.target.value || 'todos';
    await this._aplicarFiltros();
  }

  //Esto se emplea para cargar mas tareas al hacer scroll, pero si hay filtros activos no se hace nada
  async cargarMasTareas(e: InfiniteScrollCustomEvent) {
    if (!this.hasMore || this._hayFiltrosActivos()) {
      e.target.complete();
      return;
    }
    await this.listarTareas();
    e.target.complete();
  }

  async checkedTarea(tarea: Tarea) {
    tarea.completado = !tarea.completado;
    await this.tareaService.editarTarea(tarea);
  }

  async editarTarea(tarea: Tarea) {
    await this.modalService.abrirModal(TareaModalPage, { tareaEdit: tarea });
    await this.modalService.postCierreModal(() => {
      this._recargar();
    });
  }

  async eliminarTarea(id: string) {
    try {
      this.alertService.crearAlerta(
        'Confirmar eliminacion',
        '¿Estás seguro de eliminar esta tarea?',
        [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Eliminar',
            role: 'confirm',
            handler: async () => {
              await this.tareaService.eliminarTarea(id);
              await this._recargar();
              this.alertService.crearToast('top', 'Tarea eliminada', 'warning');
            },
          },
        ],
      );
    } catch (error) {
      this.alertService.crearToast('top', 'Error al eliminar', 'danger');
    }
  }

  private async _recargar() {
    if (this._hayFiltrosActivos()) {
      await this._aplicarFiltros();
    } else {
      await this.listarTareas(true);
    }
  }

  private async _aplicarFiltros() {
    const todas = await this.tareaService.listarTareas();

    this.tareas = todas.filter((tarea) => {
      const matchBuscar =
        !this.filtros.buscar ||
        tarea.titulo.toLowerCase().includes(this.filtros.buscar);

      const matchCategoria =
        this.filtros.categoria === 'todas' ||
        tarea.categoriaId?.id === this.filtros.categoria;

      const matchEstado =
        this.filtros.estado === 'todos' ||
        (this.filtros.estado === 'completadas' && tarea.completado) ||
        (this.filtros.estado === 'pendientes' && !tarea.completado);

      return matchBuscar && matchCategoria && matchEstado;
    });
  }

  private _hayFiltrosActivos(): boolean {
    return (
      this.filtros.buscar !== '' ||
      this.filtros.categoria !== 'todas' ||
      this.filtros.estado !== 'todos'
    );
  }
}
