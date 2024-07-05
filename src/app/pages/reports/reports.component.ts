import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  constructor(private reportService: ReportService) { }

  generarReporteInventario(): void {
    this.reportService.generarReporteInventario().subscribe(blob => {
      this.descargarReporte(blob, 'reporte_inventario.pdf');
    }, error => {
      console.error('Error generating inventory report:', error);
    });
  }

  generarReporteSolicitudes(): void {
    this.reportService.generarReporteSolicitudes().subscribe(blob => {
      this.descargarReporte(blob, 'reporte_solicitudes.pdf');
    }, error => {
      console.error('Error generating requests report:', error);
    });
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


