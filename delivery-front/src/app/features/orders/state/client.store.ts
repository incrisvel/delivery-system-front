import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientStore {
    clientLongitude = signal<number | null>(null);
    clientLatitude = signal<number | null>(null);
}
