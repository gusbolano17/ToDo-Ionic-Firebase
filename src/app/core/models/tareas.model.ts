import { Categoria } from "./categorias.model";

export interface Tarea{
    id : string;
    titulo : string;
    descripcion : string;
    completado : boolean;
    categoriaId : Categoria
}