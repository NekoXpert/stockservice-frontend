import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceRequestService } from '../../services/service-request.service';
import { SolicitudServicio } from '../../models/solicitud-servicio';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  serviceRequests: SolicitudServicio[] = [];

  constructor(private serviceRequestService: ServiceRequestService) { }

  fetchServiceRequests(): void {
    this.serviceRequestService.obtenerSolicitudes().subscribe(data => {
      this.serviceRequests = data;
    });
  }
}

