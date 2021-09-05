import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  error: string | null = null;
  isAuthorized = false;

  private first: string | null = null;
  private last: string | null = null;

  constructor(private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
    this.getUser();
  };

  private getUser(): void {
    if (this.authService.isAuthorized()) {
      this.authService.getUser().subscribe((resp: any) => {
        this.isAuthorized = true;
        this.setName(resp.firstName, resp.lastName);
      }, (error: any) => {
        this.isAuthorized = false;
        if (error.error.message === 'Unauthorized') {
          this.error = 'Oh, you are not authorized :(';
          setTimeout(() => { this.router.navigate(['login']); }, 3000);
        } else {
          this.error = error.error.message;
        };
      });
    } else {
      this.isAuthorized = false;
      this.error = 'Oh, you are not authorized :(';
      setTimeout(() => { this.router.navigate(['login']); }, 3000);
    };
  };

  setName(first: string, last: string): void {
    this.first = first;
    this.last = last;
  };

  getName(): any {
    return {
      first: this.first,
      last: this.last
    };
  };

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  };
};
