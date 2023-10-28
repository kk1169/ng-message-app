import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ionChatbox } from '@ng-icons/ionicons';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'server/src/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser$: Observable<IUser | null> = this.authSerivce.currentUser;
  constructor(private authSerivce: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authSerivce.onLogout();
  }
}
