import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Tarea } from '../../core/models/tareas.model';

@Injectable({
  providedIn: 'root',
})
export class TareasService {

  private readonly TAREA_KEY = 'tareas';
  private _cache: Tarea[] | null = null;

  constructor(private storageService: StorageService) {}

  private async _obtenerCache(): Promise<Tarea[]> {
    if (this._cache === null) {
      const datos = await this.storageService.obtener(this.TAREA_KEY);
      this._cache = datos || [];
    }
    return this._cache as Tarea[];
  }

  async listarTareas(): Promise<Tarea[]> {
    return this._obtenerCache();
  }

  async listarTareasPaginadas(pagina: number, limite: number) {
    const todas = await this._obtenerCache();
    const inicio = (pagina - 1) * limite;
    return {
      data: todas.slice(inicio, inicio + limite),
      total: todas.length,
      hasMore: inicio + limite < todas.length,
    };
  }

  async guardarTarea(tarea: Tarea) {
    const tareas = await this._obtenerCache();
    tareas.push(tarea);
    this._cache = tareas;
    return this.storageService.setear(this.TAREA_KEY, tareas);
  }

  async editarTarea(tarea: Tarea) {
    const tareas = await this._obtenerCache();
    const idx = tareas.findIndex((t) => t.id === tarea.id);
    if (idx !== -1) {
      tareas[idx] = tarea;
      this._cache = tareas;
      return this.storageService.setear(this.TAREA_KEY, tareas);
    }
  }

  async eliminarTarea(id: string) {
    const tareas = await this._obtenerCache();
    const filtradas = tareas.filter((t) => t.id !== id);
    this._cache = filtradas;
    return this.storageService.setear(this.TAREA_KEY, filtradas);
  }

  invalidateCache() {
    this._cache = null;
  }
}