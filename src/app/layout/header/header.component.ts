import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { delay, of, tap } from 'rxjs';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-header',
  imports: [LoaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private tokenService = inject(TokenService);
  username = localStorage.getItem('email');
  showLogout = false;

  loader: boolean =false;

  constructor(private router: Router) {} // Inject the Router

  toggleLogout(event: Event) {
    event.stopPropagation(); // Prevent default link behavior
    this.showLogout = !this.showLogout;
  }

  logout() {
    of(1)
    .pipe(
      tap(() => this.loader=true),
      delay(500),
      tap(() => {
        this.tokenService.revokeToken();
        this.loader=false;
        this.router.navigate(['']);
      })
    )
    .subscribe({
      next: () => {
        console.log('Token revocado '+ this.tokenService.getToken);
      }
    });
   
    // this.loader=true;
    // this.tokenService.revokeToken();
    // this.loader=false;
    // this.router.navigate(['']);
    // console.log('Token revocado '+ this.tokenService.getToken);
  }

}
