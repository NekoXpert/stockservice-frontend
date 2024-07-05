import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceRequestService, Tecnico } from '../../services/service-request.service';
import { SolicitudServicio } from '../../models/solicitud-servicio';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  serviceRequests: SolicitudServicio[] = [];
  nuevaSolicitud: Partial<SolicitudServicio> = {};
  solicitudId: number | string = '';
  tecnicoId: number | string = '';
  estado: string = '';
  clienteNombre: string = '';
  alertMessage: string | null = null;
  tecnicos: Tecnico[] = [];

  constructor(private serviceRequestService: ServiceRequestService) { }

  ngOnInit(): void {
    this.fetchServiceRequests();
    this.fetchTecnicos();
  }

  fetchServiceRequests(): void {
    this.serviceRequestService.obtenerSolicitudes().subscribe(data => {
      this.serviceRequests = data;
    });
  }

  fetchTecnicos(): void {
    this.serviceRequestService.obtenerTecnicos().subscribe(data => {
      this.tecnicos = data;
    });
  }

  registrarSolicitud(): void {
    this.nuevaSolicitud.estado = 'Pendiente';  // Establecer el estado por defecto
    this.serviceRequestService.registrarSolicitud(this.nuevaSolicitud as SolicitudServicio).subscribe(() => {
      this.fetchServiceRequests();
      this.nuevaSolicitud = {};  // Limpiar el formulario después de agregar
      this.showAlert('Solicitud registrada exitosamente');
    });
  }

  asignarTecnico(): void {
    this.serviceRequestService.asignarTecnico(Number(this.solicitudId), Number(this.tecnicoId)).subscribe(() => {
      this.fetchServiceRequests();
      this.showAlert('Técnico asignado exitosamente');
    });
  }

  filtrarSolicitudesPorCliente(): void {
    this.serviceRequestService.filtrarSolicitudesPorCliente(this.clienteNombre).subscribe(data => {
      this.serviceRequests = data;
    });
  }

  filtrarSolicitudesPorTecnico(): void {
    this.serviceRequestService.filtrarSolicitudesPorTecnico(String(this.tecnicoId)).subscribe(data => {
      this.serviceRequests = data;
    });
  }

  actualizarEstado(): void {
    this.serviceRequestService.actualizarEstado(Number(this.solicitudId), this.estado).subscribe(() => {
      this.fetchServiceRequests();
      this.showAlert('Estado actualizado exitosamente');
    });
  }

  showAlert(message: string): void {
    this.alertMessage = message;
    setTimeout(() => {
      this.alertMessage = null;
    }, 5000);
  }
}
