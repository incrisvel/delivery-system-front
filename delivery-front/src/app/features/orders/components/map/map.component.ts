import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { FormsModule } from '@angular/forms';
import { EstablishmentService } from '../../services/establishment.service';
import { Establishment } from '../../models';
import { getMarkerIconOptions } from '../../utils/rating.utils';
import { ClientStore } from '../../state/client.store';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  @Output() establishmentSelected = new EventEmitter<Establishment>();

  private map!: L.Map;
  private userMarker!: L.Marker;
  private establishmentMarkers: L.Marker[] = [];

  userLocation: { latitude: number; longitude: number } | null = null;

  isLoading = false;
  loadingMessage = 'Carregando sua localização...';

  constructor(private establishmentService: EstablishmentService, private store: ClientStore) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.getUserLocation();
  }

  private initMap(): void {
    this.map = L.map('map', { center: [0, 0], zoom: 2 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);
  }

  private getUserLocation(): void {
    this.isLoading = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.userLocation = { latitude, longitude };
        
        this.store.clientLatitude.set(latitude)
        this.store.clientLongitude.set(longitude)

        this.showUserLocation(latitude, longitude);
        this.fetchEstablishments(latitude, longitude);
        this.isLoading = false;
      },
      (err) => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  private showUserLocation(lat: number, lon: number): void {
    this.map.setView([lat, lon], 15);

    const markerIcon = L.icon(
      getMarkerIconOptions('assets/images/marker-icon-purple.png')
    );

    this.userMarker?.remove();
    this.userMarker = L.marker([lat, lon], { icon: markerIcon })
      .addTo(this.map)
      .bindPopup('Você está aqui!')
      .openPopup();
  }

  private fetchEstablishments(lat: number, lon: number) {
    this.establishmentService
      .getEstablishmentsNearby(lat, lon)
      .subscribe((establishments) => {
        this.renderEstablishmentMarkers(establishments);
      });
  }

  private renderEstablishmentMarkers(establishments: Establishment[]) {
    this.establishmentMarkers.forEach((m) => this.map.removeLayer(m));
    this.establishmentMarkers = [];

    const markerIcon = L.icon(
      getMarkerIconOptions('assets/images/marker-icon-black.png')
    );

    establishments.forEach((rest) => {
      const marker = L.marker([rest.latitude, rest.longitude], {
        icon: markerIcon,
      })
        .addTo(this.map)
        .bindPopup(rest.name);

      marker.on('click', () => {
        this.establishmentSelected.emit(rest);
      });

      this.establishmentMarkers.push(marker);
    });
  }
}
