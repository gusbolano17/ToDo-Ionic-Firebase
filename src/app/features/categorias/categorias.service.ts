import { Injectable } from '@angular/core';
import { Categoria } from 'src/app/core/models/categorias.model';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private readonly CATEGORIA_KEY = 'categorias';

  constructor(private storageService: StorageService) {}

  async listarCategorias(): Promise<Categoria[]> {
    const test = await this.storageService.obtener(this.CATEGORIA_KEY);
    console.log('STORAGE REAL:', test);

    const categorias = await this.storageService.obtener(this.CATEGORIA_KEY);
    return categorias || [];
  }

  async guardarCategoria(categoria: Categoria) {
    const categorias = await this.listarCategorias();
    categorias.push(categoria);
    return await this.storageService.setear(this.CATEGORIA_KEY, categorias);
  }

  async editarCategoria(categoria: Categoria) {
    let categorias = await this.listarCategorias();
    const idx = categorias.findIndex((t) => t.id === categoria.id);
    if (idx !== -1) {
      categorias[idx] = categoria;
      return this.storageService.setear(this.CATEGORIA_KEY, categorias);
    }
  }

  async eliminarCategoria(id: string) {
    let categorias = await this.listarCategorias();
    categorias = categorias.filter((c) => c.id !== id);
    return await this.storageService.setear(this.CATEGORIA_KEY, categorias);
  }
}
