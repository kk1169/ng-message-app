import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.scss']
})
export class MessageListItemComponent {
  @Input() read = false;
}
