import { Dish } from "./dish.model";

export interface OrderItem {
  dish: Dish;
  dish_id: number;
  quantity: number;
  total: number;
}