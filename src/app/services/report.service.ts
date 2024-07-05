import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = `${environment.API_URL}/reportes`;

  constructor(private http: HttpClient) { }

  generarReporteInventario(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/inventario`, { responseType: 'blob' });
  }

  generarReporteSolicitudes(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/solicitudes`, { responseType: 'blob' });
  }

  descargarReporte(blob: Blob, nombreArchivo: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}



