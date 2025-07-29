import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async register() {
    if (this.form.invalid) {
      alert('Por favor llena correctamente todos los campos.');
      return;
    }

    const { email, password } = this.form.value;
    try {
      await this.auth.register(email, password);
      alert('Usuario creado con éxito');
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Error al registrar usuario: ' + error);
    }
  }
}
