import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const registerData = this.registerForm.value;
    this.authService.register(registerData).subscribe(
      () => {
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert("Erreur lors de l'inscription !");
      }
    );
  }
}
