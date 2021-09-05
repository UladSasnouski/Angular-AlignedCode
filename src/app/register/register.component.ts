import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    }
    this.authService.register(this.reactiveForm.value.name, this.reactiveForm.value.password, this.reactiveForm.value.first, this.reactiveForm.value.last).subscribe(() => {
      this.router.navigate(['login']);
    }, (error: any) => {
      this.error = error.error.message;
    });
  };
  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  };

  private initForm() {
    this.reactiveForm = this.fb.group({
      first: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zА-Яа-я]/)
      ]
      ],
      last: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-zА-Яа-я]/)
      ]
      ],
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
