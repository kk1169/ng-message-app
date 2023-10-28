import { Routes } from '@angular/router';
import { GuestComponent } from './shared/layouts/guest/guest.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MasterComponent } from './shared/layouts/master/master.component';
import { ComposeComponent } from './pages/compose/compose.component';
import { InboxComponent } from './pages/inbox/inbox.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth', component: GuestComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '', component: MasterComponent, children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'compose', component: ComposeComponent }
    ]
  }
];
