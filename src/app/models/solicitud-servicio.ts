import { Producto } from './producto';

export interface SolicitudServicio {
    id: number;
    clienteNombre: string;
    clienteContacto: string;
    descripcion: string;
    estado: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    tecnicoAsignadoId: number | null; // ID del técnico asignado
    productos: Producto[];
}
