import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string | null = null;

  reactiveForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
    this.initForm();
  };

  onSubmit() {
    const controls = this.reactiveForm.controls;

    if (this.reactiveForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    };
    this.authService.login(this.reactiveForm.value.name, this.reactiveForm.value.password).subscribe(() => {
      this.router.navigate(['user']);
    }, (error: any) => {
      this.error = error.error.message;
    });;
  };
  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  };

  private initForm() {
    this.reactiveForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/[A-Za-zА-Яа-я0-9]/)
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/)
      ]
      ]
    });
  };
};
