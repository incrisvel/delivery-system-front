import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstablishmentService } from '../../services/establishment.service';
import { Order } from '../../models';
import { OrderStore } from '../../state/order.store';
import { ClientStore } from '../../state/client.store';
import { WebSocketService } from '../../../../core/websocket';
import { NotificationService } from '../../../../core/notifications';

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
    private establishmentService: EstablishmentService,
    private client: ClientStore,
    private websocket: WebSocketService,
    private notifications: NotificationService
  ) {
    this.websocket.onMessage = (msgString) => {
      const msg = JSON.parse(msgString);

      const orderId = msg.order_id;
      const status = msg.order?.status ?? msg.status;
      const courier = msg.order?.courier;

      const br = new Date(msg.order.estimated_arrival_at).toLocaleString(
        'pt-BR',
        {
          dateStyle: 'short',
          timeStyle: 'short',
        }
      );

      if (status === 'created') {
        this.notifications.push(
          `Pedido ${orderId} criado! Estamos procurando alguém para levá-lo até você...`,
          'success'
        );
      } else if (status === 'assigned') {
        this.notifications.push(
          `Atualização do pedido ${orderId}: ${
            courier ?? 'o entregador'
          } o levará até você.`,
          'info'
        );
      } else if (status === 'enroute') {
        this.notifications.push(
          `Pedido ${orderId} a caminho! ${
            courier ?? 'O entregador'
          } saiu para entrega. Horário estimado: ${
            br ?? 'Desconhecido'
          }.`,
          'info'
        );
      } else if (status === 'delivered') {
        this.notifications.push(`Que ótimo, seu pedido ${orderId} foi entregue! Bon appétit 😋`, 'success');
      }
    };
  }

  onCreateOrder() {
    const order: Order = {
      client: 'Sofia',
      client_lat: this.client.clientLatitude()!,
      client_long: this.client.clientLongitude()!,
      establishment_id: this.order.establishment()?.id!,
      items: this.order.selectedItems(),
      total: this.order.totalPrice(),
    };
    this.establishmentService.createOrder(order).subscribe((response) => {
      this.order.orderId.set(response.id!);
      this.websocket.connect(response.id!);
    });
  }
}
