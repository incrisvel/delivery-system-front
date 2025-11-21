import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstablishmentService } from '../../services/establishment.service';
import { Order } from '../../models';
import { OrderStore } from '../../state/order.store';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  constructor(
    public order: OrderStore,
    private establishmentService: EstablishmentService
  ) {}

  onCreateOrder() {
    const order: Order = {
      client: 'Sofia',
      establishment_id: this.order.establishment()?.id!,
      items: this.order.selectedItems(),
      total: this.order.totalPrice(),
    }
    this.establishmentService.createOrder(order).subscribe(order => console.log('Pedido confirmado!', order));
  }
}
