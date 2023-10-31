import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      (response) => {
        this.authService.setAuthStatus(true);
        console.log('Login réussi', response);
        this.router.navigate(['/product']);
      },
      (error) => {
        this.authService.setAuthStatus(false);
        console.log('Erreur lors du login', error);
        alert('Mot de passe ou email incorrecte');
      }
    );
  }
}
