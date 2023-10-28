import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent, AlertType, IAlert } from 'src/app/shared/components/alert/alert.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ILoginResponse } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  message!: IAlert;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submitted = false;
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: (value: ILoginResponse) => {
          this.message = { type: AlertType.success, message: value.message, show: true };

          setTimeout(() => {
            this.router.navigate(['inbox']);
          }, 2000);
        },
        error: (error) => {
          this.message = { type: AlertType.error, message: error, show: true };
        }
      })
    }
  }
}
