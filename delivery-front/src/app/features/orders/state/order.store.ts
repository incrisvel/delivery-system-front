import { Injectable, signal, computed } from '@angular/core';
import { Establishment, Dish, OrderItem } from '../models';
import { getStars } from '../utils/rating.utils';

@Injectable({ providedIn: 'root' })
export class OrderStore {
    establishment = signal<Establishment | null>(null);

    dishes = signal<Dish[]>([]);

    items = signal<Record<number, OrderItem>>({});

    selectedItems = computed(() =>
        Object.values(this.items()).filter(i => i.quantity > 0)
    );

    totalPrice = computed(() =>
        this.selectedItems().reduce((sum, item) => sum + item.total, 0)
    );

    stars = computed(() => getStars(this.establishment()?.rating ?? 0));

    hasItems = computed(() =>
        this.selectedItems().length > 0
    );

    setEstablishment(est: Establishment, dishes: Dish[]) {
        this.establishment.set(est);
        this.dishes.set(dishes);

        const initial: Record<number, OrderItem> = {};
        dishes.forEach(d => initial[d.id] = { dish_id: d.id, dish: d, quantity: 0, total: 0 });
        this.items.set(initial);
    }

    toggleDish(dish: Dish) {
        this.items.update(items => {
        const item = items[dish.id];
        item.quantity = item.quantity > 0 ? 0 : 1;
        item.total = item.quantity * dish.price;
        return { ...items };
        });
    }

    increment(dish: Dish) {
        this.items.update(items => {
        const item = items[dish.id];
        item.quantity++;
        item.total = dish.price * item.quantity;
        return { ...items };
        });
    }

    decrement(dish: Dish) {
        this.items.update(items => {
        const item = items[dish.id];
        if (item.quantity > 0) item.quantity--;
        item.total = dish.price * item.quantity;
        return { ...items };
        });
    }
}
