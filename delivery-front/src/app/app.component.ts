import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationListComponent } from "./core/notifications";
import { WebSocketService } from './core/websocket';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'delivery-front';
}
