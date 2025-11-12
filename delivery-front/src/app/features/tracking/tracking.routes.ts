import { Routes } from "@angular/router";
import { MapComponent } from "./components/map/map.component";

export const TRACKING_ROUTES: Routes = [
  {
    path: 'order-tracking',
    component: MapComponent,
    title: 'Acompanhar pedido',
  },
];