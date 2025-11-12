import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import { NominatimService } from '../../services/nominatim.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
private map!: L.Map;
  query = '';

  constructor(private nominatim: NominatimService) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-23.55052, -46.633308],
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap France contributors'
    }).addTo(this.map);
  }

  onSearch(): void {
    if (!this.query.trim()) return;

    this.nominatim.search(this.query).subscribe((results) => {
      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];

        this.map.setView([lat, lon], 14);

        L.marker([lat, lon])
          .addTo(this.map)
          .bindPopup(display_name)
          .openPopup();
      } else {
        alert('Endereço não encontrado.');
      }
    });
  }
}
