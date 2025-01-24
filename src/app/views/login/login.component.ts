import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../service/authenticate.service';
import { IUserRequestDTO } from '../../interfaces/authinterface';
import { filter, tap } from 'rxjs';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private autenticacionService = inject(AuthenticateService);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.autenticacionService
        .login(this.loginForm.getRawValue() as unknown as IUserRequestDTO)
        .pipe(
          
          filter(result => {
            if(result!.token) {
              localStorage.setItem('email', this.getEmail);
              this.tokenService.handleToken(result.token);

              this.router.navigate(['app/dashboard']);
              return true;
            }
            return false;
          }),
          tap(data=> console.log(data))
        )
        .subscribe({
          next: () => {
            console.log('El flujo se ejecutó correctamente.');
          },
          error: (err) => {
            console.error('Ocurrió un error:', err);
            alert('Error de autenticación. Por favor, revisa tus credenciales.');
          },
          complete: () => {
            console.log('El flujo ha finalizado.');
          }
        });
    }
  }

  get getEmail(): string {
    return this.loginForm.value.email ?? '';
  }

}
