import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${environment.API_URL}/productos`;

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  crearProducto(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/registrar`, product);
  }

  actualizarStock(id: number, cantidad: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/actualizar-stock/${id}`, { cantidad });
  }

  obtenerProductosObsoletos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/alertar-obsoletos`);
  }

  filtrarProductosPorTipo(tipo: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/filtrar-tipo?tipo=${tipo}`);
  }

  filtrarProductosPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/filtrar-nombre?nombre=${nombre}`);
  }
}

