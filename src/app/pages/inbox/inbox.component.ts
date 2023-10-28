import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListItemComponent } from 'src/app/shared/components/message-list-item/message-list-item.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, MessageListItemComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe({
      next: (value) => {
        console.log(value.data);
      },
    })
  }
}
