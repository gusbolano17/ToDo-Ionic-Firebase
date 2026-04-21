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

  async remove(clave: string) {
    await this.init();
    await this._storage?.remove(clave);
  }
  
}
