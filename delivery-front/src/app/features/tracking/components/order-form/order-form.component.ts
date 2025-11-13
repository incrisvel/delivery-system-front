import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  selectedRestaurant?: Restaurant;

  order = {
    description: ''
  };

  submitOrder() {}
}
