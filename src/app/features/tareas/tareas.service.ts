import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Tarea } from '../../core/models/tareas.model';

@Injectable({
  providedIn: 'root',
})
export class TareasService {

  private readonly TAREA_KEY = 'tareas';

  constructor(private storageService: StorageService) {}

  async listarTareas(): Promise<Tarea[]> {
    const tareas = await this.storageService.obtener(this.TAREA_KEY);
    return tareas || [];
  }

  // async listarTareasPaginadas(pagina : number, limite : number): Promise<Tarea[]> {
  //   return await this.storageService.obtenerPaginado(this.TAREA_KEY, pagina, limite);
  // }

  async guardarTarea(tarea: Tarea) {
    const tareas = await this.listarTareas();
    tareas.push(tarea);
    return await this.storageService.setear(this.TAREA_KEY, tareas);
  }

  async editarTarea(tarea : Tarea){
    let tareas = await this.listarTareas();
    const idx = tareas.findIndex(t => t.id === tarea.id);
    if (idx !== -1){
      tareas[idx] = tarea;
      return this.storageService.setear(this.TAREA_KEY,tareas);
    }

  }

  async eliminarTarea(id : string){
    let tareas = await this.listarTareas();
    tareas = tareas.filter(t => t.id !== id);
    return await this.storageService.setear(this.TAREA_KEY,tareas);
  }
  
}
