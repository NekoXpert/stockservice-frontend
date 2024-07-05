import { Producto } from './producto';

export interface ProductoComponentePC extends Producto {
    tipoComponente: string;
    especificaciones: string;
}
