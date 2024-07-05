import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';
import { ProductoComponentePC } from '../../models/producto-componente-pc';
import { ProductoPeriferico } from '../../models/producto-periferico';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Producto[] = [];
  nuevoProducto: Partial<Producto> & Partial<ProductoComponentePC> & Partial<ProductoPeriferico> = {};  // Partial para permitir campos opcionales
  idProducto: number = 0;
  nuevaCantidad: number = 0;
  nombreFiltro: string = '';
  tipoFiltro: string = '';
  alertMessage: string | null = null;
  errorCantidad: boolean = false;

  constructor(private productService: ProductService) { }

  fetchProducts(): void {
    this.productService.obtenerProductos().subscribe(data => {
      this.products = data;
    });
  }

  registrarProducto(): void {
    try {
      if (this.nuevoProducto.tipo === 'ComponentePC') {
        const producto: ProductoComponentePC = {
          ...this.nuevoProducto,
          tipoComponente: (this.nuevoProducto as ProductoComponentePC).tipoComponente,
          especificaciones: (this.nuevoProducto as ProductoComponentePC).especificaciones
        } as ProductoComponentePC;
        this.productService.crearProducto(producto).subscribe(() => {
          this.fetchProducts();
          this.nuevoProducto = {};  // Limpiar el formulario después de agregar
          this.showAlert('Producto registrado exitosamente');
        }, error => {
          this.showAlert('Error al registrar el componente PC');
        });
      } else if (this.nuevoProducto.tipo === 'Periferico') {
        const producto: ProductoPeriferico = {
          ...this.nuevoProducto,
          marca: (this.nuevoProducto as ProductoPeriferico).marca,
          modelo: (this.nuevoProducto as ProductoPeriferico).modelo
        } as ProductoPeriferico;
        this.productService.crearProducto(producto).subscribe(() => {
          this.fetchProducts();
          this.nuevoProducto = {};  // Limpiar el formulario después de agregar
          this.showAlert('Producto registrado exitosamente');
        }, error => {
          this.showAlert('Error al registrar el periférico');
        });
      } else {
        this.showAlert('Tipo de producto no reconocido');
      }
    } catch (error) {
      this.showAlert('Error al registrar el producto: ');
    }
  }

  actualizarStock(): void {
    if (this.errorCantidad) {
      return;
    }
    this.productService.actualizarStock(this.idProducto, this.nuevaCantidad).subscribe(() => {
      this.products = [];
      this.showAlert('Stock actualizado exitosamente');
    });
  }

  obtenerProductosConBajoStock(): void {
    this.productService.obtenerProductosConBajoStock().subscribe(data => {
      this.products = data;
    });
  }

  filtrarPorTipo(): void {
    if (this.tipoFiltro) {
      this.productService.filtrarProductosPorTipo(this.tipoFiltro).subscribe(data => {
        this.products = data;
      });
    } else {
      this.fetchProducts();
    }
  }

  filtrarPorNombre(): void {
    if (this.nombreFiltro) {
      this.productService.filtrarProductosPorNombre(this.nombreFiltro).subscribe(data => {
        this.products = data;
      });
    } else {
      this.fetchProducts();
    }
  }

  validarCantidad(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const pattern = /^[0-9]\d*$/;
    this.errorCantidad = !pattern.test(value);
  }

  showAlert(message: string): void {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null;
    }, 5000);
  }
}

