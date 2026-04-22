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
    const test = await this.storageService.obtener(this.TAREA_KEY);
    console.log('STORAGE REAL:', test);

    if (this._cache !== null) {
      return this._cache;
    }

    const datos = await this.storageService.obtener(this.TAREA_KEY);

    if (Array.isArray(datos)) {
      this._cache = datos;
    } else {
      this._cache = [];
    }

    return this._cache;
  }

  async listarTareas(): Promise<Tarea[]> {
    return await this._obtenerCache();
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

    const nuevas = [...tareas, tarea];

    this._cache = nuevas;

    await this.storageService.setear(this.TAREA_KEY, nuevas);
  }

  async editarTarea(tarea: Tarea) {
    const tareas = await this._obtenerCache();
    const idx = tareas.findIndex((t) => t.id === tarea.id);
    if (idx !== -1) {
      tareas[idx] = tarea;
      this._cache = tareas;
      return await this.storageService.setear(this.TAREA_KEY, tareas);
    }
  }

  async eliminarTarea(id: string) {
    const tareas = await this._obtenerCache();
    const filtradas = tareas.filter((t) => t.id !== id);
    this._cache = filtradas;
    return await this.storageService.setear(this.TAREA_KEY, filtradas);
  }

  invalidateCache() {
    this._cache = null;
  }
}
