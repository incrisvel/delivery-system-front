import { Routes } from "@angular/router";
import { FoodOrderingComponent } from "./pages/food-ordering/food-ordering.component";

export const ORDER_ROUTES: Routes = [
  {
    path: 'orders',
    component: FoodOrderingComponent,
    title: 'Fazer pedido',
  },
];