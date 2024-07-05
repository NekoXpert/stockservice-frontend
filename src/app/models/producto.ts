export interface Producto {
getDescripcion(): unknown;
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
    tipo: string; // Este campo se utilizará para determinar si es un componente de PC o un producto electrónico.
    descripcion: string;
}
