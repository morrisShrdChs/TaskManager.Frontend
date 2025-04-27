import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerData = {
    userName: '',
    email: '',
    name: '',
    password: '',
    role: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        alert('Регистрация прошла успешно! Теперь войдите.');
        this.router.navigate(['/auth/login']);
      },
      error: err => {
        console.error(err);
        alert('Ошибка регистрации!');
      }
    });
  }
}
