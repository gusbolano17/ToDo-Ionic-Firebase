import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  ModalController,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { v4 as uuidv4 } from 'uuid';
import { Tarea } from 'src/app/core/models/tareas.model';
import { TareasService } from 'src/app/features/tareas/tareas.service';
import { Categoria } from 'src/app/core/models/categorias.model';
import { AlertsService } from '../../../core/services/alerts.service';
import { CategoriasService } from '../../categorias/categorias.service';

@Component({
  selector: 'app-tarea-modal',
  templateUrl: './tarea-modal.page.html',
  styleUrls: ['./tarea-modal.page.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonInput,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TareaModalPage implements OnInit {
  @Input() tareaEdit: Tarea | null = null;

  public tareaForm: FormGroup;
  public categorias: Categoria[] = [];

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private tareaService: TareasService,
    private categoriaService: CategoriasService,
    private alertService: AlertsService,
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: [null],
    });
  }

  ngOnInit(): void {
    if (this.tareaEdit != null) {
      this.tareaForm.patchValue({
        titulo: this.tareaEdit.titulo,
        descripcion: this.tareaEdit.descripcion,
        categoria: this.tareaEdit.categoriaId,
      });
    }
    this.obtenerCategorias();
  }

  async onDismiss() {
    this.modalController.dismiss();
  }

  async obtenerCategorias(){
    this.categorias = await this.categoriaService.listarCategorias();
  }

  async onSubmit() {
    const tareaBody: Tarea = {
      id: this.tareaEdit != null ? this.tareaEdit.id : uuidv4(),
      titulo: this.tareaForm.get('titulo')?.value,
      descripcion: this.tareaForm.get('descripcion')?.value,
      completado: this.tareaEdit != null ? this.tareaEdit.completado : false,
      categoriaId: this.tareaForm.get('categoria')?.value,
    };

    try {
      if (this.tareaEdit != null) {
        await this.tareaService.editarTarea(tareaBody);
        this.alertService.crearToast(
          'top',
          'Tarea editada con exito',
          'success',
        );
      } else {
        await this.tareaService.guardarTarea(tareaBody);
        this.alertService.crearToast(
          'top',
          'Tarea creada con exito',
          'success',
        );
      }
    } catch (error) {
      this.alertService.crearToast(
        'top',
        'Error al realizar la operacion',
        'danger',
      );
    }

    await this.onDismiss();
  }
}
