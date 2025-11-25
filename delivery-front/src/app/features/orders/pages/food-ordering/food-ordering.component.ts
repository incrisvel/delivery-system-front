import { Component } from '@angular/core';
import { MapComponent, OrderFormComponent } from '../../components';
import { Establishment } from '../../models';
import { OrderStore } from '../../state/order.store';
import { EstablishmentService } from '../../services/establishment.service';

@Component({
  selector: 'app-food-ordering',
  standalone: true,
  imports: [
    OrderFormComponent,
    MapComponent
  ],
  templateUrl: './food-ordering.component.html',
  styleUrl: './food-ordering.component.scss'
})
export class FoodOrderingComponent {
  constructor(
    private order: OrderStore,
    private establishmentService: EstablishmentService
  ) {}

  onSelect(establishment: Establishment) {
    this.establishmentService.getDishes(establishment.id).subscribe(dishes => {
      this.order.setEstablishment(establishment, dishes);
    });
  }
}
