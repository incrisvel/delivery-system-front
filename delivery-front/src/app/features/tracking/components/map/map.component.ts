import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { NominatimService } from '../../services/nominatim.service';
import { FormsModule } from '@angular/forms';
import { OrderFormComponent } from "../order-form/order-form.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OrderFormComponent
],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  private map!: L.Map;
  private userMarker!: L.Marker;
  private routeControl?: L.Routing.Control;

  userLocation: { latitude: number, longitude: number } | null = null;
  private restaurant = L.latLng(-23.556, -46.64);
  private customer = L.latLng(-23.562, -46.625);

  isLoading: boolean = false;
  loadingMessage: string = 'Carregando sua localização...';


  constructor(private nominatim: NominatimService) { }

  ngOnInit(): void {
    //this.getUserLocation();
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.addRoute(this.restaurant, this.customer);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 2
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addRoute(origin: L.LatLng, destination: L.LatLng): void {
    this.routeControl = (L.Routing as any).control({
      waypoints: [origin, destination],
      lineOptions: {
        styles: [{ color: '#007bff', weight: 5 }]
      },
      draggableWaypoints: false,
      addWaypoints: false,
      routeWhileDragging: false,
      show: false
    }).addTo(this.map);
  }

  private getUserLocation(): void {
    this.isLoading = true;

    if (!navigator.geolocation) {
      console.error('Geolocalização não é suportada neste navegador.');
      this.isLoading = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.userLocation = { latitude, longitude };
        this.showUserLocation(latitude, longitude);
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao obter a localização do usuário:', error);
        this.isLoading = false;
      }
    );
  }

  private showUserLocation(lat: number, lon: number): void {
    if (!this.map) return;

    this.map.setView([lat, lon], 15);

    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    this.userMarker = L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('Você está aqui!')
      .openPopup();
  }
}
