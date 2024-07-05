import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Producto[] = [];
  nuevoProducto: Partial<Producto> = {};  // Partial para permitir campos opcionales
  idProducto: number = 0;
  nuevaCantidad: number = 0;
  nombreFiltro: string = '';
  tipoFiltro: string = '';

  constructor(private productService: ProductService) { }

  fetchProducts(): void {
    this.productService.obtenerProductos().subscribe(data => {
      this.products = data;
    });
  }

  registrarProducto(): void {
    this.productService.crearProducto(this.nuevoProducto as Producto).subscribe(() => {
      this.fetchProducts();
      this.nuevoProducto = {};  // Limpiar el formulario después de agregar
    });
  }

  actualizarStock(): void {
    this.productService.actualizarStock(this.idProducto, this.nuevaCantidad).subscribe(() => {
      this.fetchProducts();
    });
  }

  obtenerProductosObsoletos(): void {
    this.productService.obtenerProductosObsoletos().subscribe(data => {
      this.products = data;
    });
  }

  filtrar(): void {
    if (this.tipoFiltro) {
      this.productService.filtrarProductosPorTipo(this.tipoFiltro).subscribe(data => {
        this.products = data;
      });
    } else if (this.nombreFiltro) {
      this.productService.filtrarProductosPorNombre(this.nombreFiltro).subscribe(data => {
        this.products = data;
      });
    } else {
      this.fetchProducts();
    }
  }
}







