import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudServicio } from '../models/solicitud-servicio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  private baseUrl = `${environment.API_URL}/solicitudes`;

  constructor(private http: HttpClient) { }

  registrarSolicitud(solicitud: SolicitudServicio): Observable<SolicitudServicio> {
    return this.http.post<SolicitudServicio>(`${this.baseUrl}/registrar`, solicitud);
  }

  asignarTecnico(id: number, tecnicoId: number): Observable<SolicitudServicio> {
    return this.http.put<SolicitudServicio>(`${this.baseUrl}/asignar-tecnico/${id}/${tecnicoId}`, {});
  }

  obtenerSolicitudes(): Observable<SolicitudServicio[]> {
    return this.http.get<SolicitudServicio[]>(this.baseUrl);
  }

  filtrarSolicitudesPorCliente(clienteNombre: string): Observable<SolicitudServicio[]> {
    return this.http.get<SolicitudServicio[]>(`${this.baseUrl}/filtrar-cliente?clienteNombre=${clienteNombre}`);
  }

  filtrarSolicitudesPorTecnico(tecnicoAsignado: string): Observable<SolicitudServicio[]> {
    return this.http.get<SolicitudServicio[]>(`${this.baseUrl}/filtrar-tecnico?tecnicoAsignado=${tecnicoAsignado}`);
  }

  actualizarEstado(id: number, estado: string): Observable<SolicitudServicio> {
    return this.http.put<SolicitudServicio>(`${this.baseUrl}/actualizar-estado/${id}?estado=${estado}`, {});
  }
}
