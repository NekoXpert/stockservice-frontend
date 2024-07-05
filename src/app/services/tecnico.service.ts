import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  private baseUrl = `${environment.API_URL}/tecnicos`;

  constructor(private http: HttpClient) { }

  registrarTecnico(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${this.baseUrl}/registrar`, tecnico);
  }

  obtenerTodosLosTecnicos(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(this.baseUrl);
  }

  filtrarTecnicosPorDisponibilidad(disponibilidad: boolean): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${this.baseUrl}/filtrar-disponibilidad?disponibilidad=${disponibilidad}`);
  }
}

