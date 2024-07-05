import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoComponentePC } from '../models/producto-componente-pc';
import { ProductoPeriferico } from '../models/producto-periferico';
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
    if ((product as ProductoComponentePC).tipoComponente) {
      return this.http.post<Producto>(`${this.baseUrl}/registrar/componente`, product);
    } else if ((product as ProductoPeriferico).marca) {
      return this.http.post<Producto>(`${this.baseUrl}/registrar/periferico`, product);
    } else {
      throw new Error("Tipo de producto no reconocido");
    }
  }

  actualizarStock(id: number, cantidad: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/actualizar-stock/${id}?cantidad=${cantidad}`, {});
  }

  obtenerProductosConBajoStock(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/alertar-bajostock`);
  }

  filtrarProductosPorTipo(tipo: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/filtrar-tipo?tipo=${tipo}`);
  }

  filtrarProductosPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/filtrar-nombre?nombre=${nombre}`);
  }
}

