import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {

}
