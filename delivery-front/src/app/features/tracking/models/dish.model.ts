export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    establishment_id: number;
    quantity?: number;
    total?: number;
}