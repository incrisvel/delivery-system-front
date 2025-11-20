export interface Order {
    id?: number;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
    status: OrderStatus;
    establishment_id: number;
    delivery_id: number;
}

export type OrderStatus = "confirmed" | "created" | "updated" | "assigned" | "enroute" | "delivered"