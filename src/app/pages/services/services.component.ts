import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceRequestService } from '../../services/service-request.service';
import { SolicitudServicio } from '../../models/solicitud-servicio';
import { Tecnico, tecnicos } from '../../models/tecnico'; // Importa el enum y la lista de técnicos

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
  solicitudId: number = 0;
  tecnicoId: number = 0;
  estado: string = '';
  clienteNombre: string = '';
  alertMessage: string | null = null;
  tecnicos = tecnicos; // Asigna la lista de técnicos al componente

  constructor(private serviceRequestService: ServiceRequestService) { }

  ngOnInit(): void {
    this.fetchServiceRequests();
  }

  fetchServiceRequests(): void {
    this.serviceRequestService.obtenerSolicitudes().subscribe(data => {
      this.serviceRequests = data;
    });
  }

  registrarSolicitud(): void {
    this.nuevaSolicitud.estado = 'Pendiente';  // Establecer el estado por defecto
    this.serviceRequestService.registrarSolicitud(this.nuevaSolicitud as SolicitudServicio).subscribe(() => {
      this.fetchServiceRequests();
      this.nuevaSolicitud = {};  // Limpiar el formulario después de agregar
      this.showAlert('Solicitud registrada exitosamente');
    }, error => {
      this.showAlert('Error al registrar la solicitud de servicio');
    });
  }

  asignarTecnico(): void {
    this.serviceRequestService.asignarTecnico(this.solicitudId, this.tecnicoId).subscribe(() => {
      this.fetchServiceRequests();
      this.showAlert('Técnico asignado exitosamente');
    }, error => {
      this.showAlert('Error al asignar el técnico');
    });
  }

  filtrarSolicitudesPorCliente(): void {
    this.serviceRequestService.filtrarSolicitudesPorCliente(this.clienteNombre).subscribe(data => {
      this.serviceRequests = data;
    });
  }

  filtrarSolicitudesPorTecnico(): void {
    const tecnico = this.tecnicos.find(t => t.id === this.tecnicoId);
    if (tecnico) {
      this.serviceRequestService.filtrarSolicitudesPorTecnico(tecnico.nombre).subscribe(data => {
        this.serviceRequests = data;
      });
    }
  }

  actualizarEstado(): void {
    this.serviceRequestService.actualizarEstado(this.solicitudId, this.estado).subscribe(() => {
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

