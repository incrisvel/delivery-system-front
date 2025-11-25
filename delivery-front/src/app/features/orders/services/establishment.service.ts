import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dish } from "../models/dish.model";
import { Establishment, Order } from "../models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getEstablishmentsNearby(lat: number, lon: number): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(`${this.baseUrl}/establishments?lat=${lat}&lon=${lon}&radius=10000`);
  }

  getDishes(establishmentId: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.baseUrl}/dishes?establishment_id=${establishmentId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, order);
  }
}