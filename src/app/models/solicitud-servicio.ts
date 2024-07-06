export interface SolicitudServicio {
    id?: number;
    clienteNombre: string;
    clienteCorreo: string;
    clienteTelefono: string;
    descripcion: string;
    estado: string;
    tecnicoAsignado: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}
