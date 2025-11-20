import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dish } from "../models/dish.model";
import { Establishment } from "../models";

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  private baseUrl = 'http://bore.pub:19783';

  constructor(private http: HttpClient) {}

  getEstablishmentsNearby(lat: number, lon: number) {
    return this.http.get<Establishment[]>(`${this.baseUrl}/establishments?lat=${lat}&lon=${lon}&radius=10000`);
  }

  getDishes(establishmentId: number) {
    return this.http.get<Dish[]>(`${this.baseUrl}/dishes?establishment_id=${establishmentId}`);
  }
}