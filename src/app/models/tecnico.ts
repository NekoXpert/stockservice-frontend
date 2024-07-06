export enum TipoTecnico {
    HARDWARE = 'Hardware',
    SOFTWARE = 'Software'
}

export interface Tecnico {
    id: number;
    nombre: string;
    tipo: TipoTecnico;
}

export const tecnicos: Tecnico[] = [
    { id: 1, nombre: 'Ana Pérez', tipo: TipoTecnico.HARDWARE },
    { id: 2, nombre: 'David Jiménez', tipo: TipoTecnico.SOFTWARE },
    { id: 3, nombre: 'Jorge Sánchez', tipo: TipoTecnico.HARDWARE },
    { id: 4, nombre: 'Laura Ramírez', tipo: TipoTecnico.SOFTWARE },
    { id: 5, nombre: 'María Fernández', tipo: TipoTecnico.HARDWARE }
];
