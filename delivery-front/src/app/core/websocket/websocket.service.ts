import { Injectable } from '@angular/core';
import { parse, z } from 'zod';

export const OrderSchema = z.object({
  order_id: z.number(),
  timestamp: z.string(),
  status: z.string(),
  order: z.object({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    estimated_arrival_at: z.string().nullable(),
    delivery_id: z.number(),
    courier: z.string(),
    status: z.string(),
  }).nullable()
});


@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket!: WebSocket;

  onMessage?: (msg: any) => void;

  connect(orderId: number) {
    this.socket = new WebSocket(`ws://localhost:8000/ws/orders/${orderId}`);

    this.socket.onmessage = ev => {
      let data = JSON.parse(ev.data);
      this.onMessage?.(data);
    };

    this.socket.onclose = () => {
      setTimeout(() => this.connect(orderId), 1000);
    };
  }

  send(message: any) {
    this.socket?.send(JSON.stringify(message));
  }
}