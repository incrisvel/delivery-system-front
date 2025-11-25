import { Routes } from '@angular/router';
import { ORDER_ROUTES } from './features/orders/order.routes';

export const routes: Routes = [
    ...ORDER_ROUTES,
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
];
