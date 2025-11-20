import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Establishment } from '../../models/establishment.model';
import { EstablishmentService } from '../../services/establishment.service';
import { Dish, Order, OrderItem } from '../../models';
import { getStars } from '../../utils/rating.utils';
import { OrderStore } from '../../state/order.store';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  constructor(public order: OrderStore) {}

  onCreateOrder() {
    console.log("Pedido confirmado:", {
      establishment: this.order.establishment(),
      items: this.order.selectedItems(),
      total: this.order.totalPrice()
    });
  }
}
