import { SolicitudServicio } from './solicitud-servicio';

export interface Tecnico {
    id: number;
    nombre: string;
    especialidad: string;
    disponibilidad: boolean;
    solicitudes: SolicitudServicio[];
}
