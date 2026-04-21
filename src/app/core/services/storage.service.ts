import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private _storage : Storage | null = null;

  constructor(private storage : Storage){
    this.init()
  }

  async init(){
    if (this._storage) return;
    this._storage = await this.storage.create();
  }

  async setear(clave : string, valor : any){
    await this.init();
    return this._storage?.set(clave, valor);
  }

  async obtener(clave : string){
    await this.init();
    return this._storage?.get(clave);
  }

  async obtenerPaginado(clave : string, pagina : number, limite : number){
    await this.init();
    const datos = await this._storage?.get(clave);
    if (datos && Array.isArray(datos)){
      const inicio = (pagina - 1) * limite;
      return {
        data : datos.slice(inicio, inicio + limite),
        total : datos.length,
        hasMore : inicio + limite < datos.length
      }
    }
    return {
      data : [],
      total : 0,
      hasMore : false
    };
  }

  async remove(clave: string) {
    await this.init();
    await this._storage?.remove(clave);
  }
  
}
