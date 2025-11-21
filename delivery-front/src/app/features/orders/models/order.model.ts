import { OrderItem } from "./order-item.model";

export interface Order {
    id?: number;
    client: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
    status?: OrderStatus;
    establishment_id: number;
    delivery_id?: number;
    items?: OrderItem[];
    total: number;
}

export type OrderStatus = "confirmed" | "created" | "updated" | "assigned" | "enroute" | "delivered"