import { Routes } from '@angular/router';
import { TRACKING_ROUTES } from './features/tracking/tracking.routes';

export const routes: Routes = [
    ...TRACKING_ROUTES,
    { path: '', redirectTo: 'order-tracking', pathMatch: 'full' },
];
