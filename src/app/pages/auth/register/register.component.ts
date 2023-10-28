import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertComponent, AlertType, IAlert } from 'src/app/shared/components/alert/alert.component';
import { IRegisterResponse } from 'src/app/core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  message!: IAlert;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.submitted = false;
      this.authService.onRegister(this.registerForm.value).subscribe({
        next: (value: IRegisterResponse) => {
          this.message = { type: AlertType.success, message: value.message, show: true };

          setTimeout(() => {
            this.router.navigate(['auth/login']);
          }, 2000);
        },
        error: (error) => {
          this.message = { type: AlertType.error, message: error, show: true };
        }
      })
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
}
