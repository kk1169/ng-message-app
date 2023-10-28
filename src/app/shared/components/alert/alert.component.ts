import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum AlertType {
  success = 'success',
  error = 'error'
}

export interface IAlert {
  type: AlertType;
  message: string;
  show: boolean;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() data: IAlert = { type: AlertType.success, message: '', show: false };
}
