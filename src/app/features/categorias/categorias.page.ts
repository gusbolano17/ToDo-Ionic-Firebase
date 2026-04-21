import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonListHeader,
  IonLabel,
  IonIcon,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  create,
  trash,
  brush,
  add,
  folderOpen,
  checkmark,
  close,
  menu,
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';
import { Categoria } from '../../core/models/categorias.model';
import { CategoriasService } from './categorias.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { InfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonListHeader,
    IonLabel,
    IonIcon,
    IonButtons,
    IonMenuButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriasPage implements OnInit {
  public nuevaCategoria: string = '';
  public categorias: Categoria[] = [];
  public editandoCategoria: boolean = false;
  public categoriaEditandoId: string = '';

  constructor(
    private categoriaService: CategoriasService,
    private alertService: AlertsService,
  ) {
    addIcons({ create, trash, brush, add, folderOpen, checkmark, close, menu });
  }

  async ngOnInit() {
    this.listarCategorias();
  }

  selectCategoriaEdit(categoria: Categoria) {
    this.editandoCategoria = true;
    this.categoriaEditandoId = categoria.id;
  }

  cancelarEdicion() {
    this.editandoCategoria = false;
    this.categoriaEditandoId = '';
    this.listarCategorias();
  }

  async listarCategorias() {
    this.categorias = await this.categoriaService.listarCategorias();
  }

  async cargarMasCategorias(e: InfiniteScrollCustomEvent) {
    await this.listarCategorias();
    setTimeout(() => {
      (e.target as HTMLIonInfiniteScrollElement).complete();
    });
  }
  

  async agregarCategoria() {
    if (this.nuevaCategoria.trim()) {
      const categoriaModel: Categoria = {
        id: uuidv4(),
        nombre: this.nuevaCategoria,
      };
      this.nuevaCategoria = '';
      await this.categoriaService.guardarCategoria(categoriaModel);
      this.alertService.crearToast('top', 'Categoría agregada', 'success');
      await this.listarCategorias();
    }
  }

  async editarCategoria(categoria: Categoria) {
    await this.categoriaService.editarCategoria(categoria);
    this.alertService.crearToast('top', 'Categoría editada', 'success');
    this.editandoCategoria = false;
    this.categoriaEditandoId = '';
    await this.listarCategorias();
  }

  async eliminarCategoria(id: string) {
    await this.categoriaService.eliminarCategoria(id);
    this.alertService.crearToast('top', 'Categoría eliminada', 'warning');
    await this.listarCategorias();
  }
}
