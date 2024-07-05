import { Producto } from './producto';

export interface ProductoPeriferico extends Producto {
    marca: string;
    modelo: string;
}
