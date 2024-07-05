import { Producto } from './producto';

export interface ProductoElectronico extends Producto {
    marca: string;
    modelo: string;
}
