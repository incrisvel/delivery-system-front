import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {
  private baseUrl = 'https://nominatim.openstreetmap.org/';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('format', 'json')
      .set('addressdetails', '1')
      .set('limit', '5');

    return this.http.get<any[]>(`${this.baseUrl}search`, { params });
  }

  reverse(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('format', 'json')
      .set('addressdetails', '1');

    return this.http.get<any>(`${this.baseUrl}reverse`, { params });
  }
}
