import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
  };

  onLog(): void {
    if (localStorage.getItem('auth_token')) {
      this.authService.getUser();
    } else {
      this.router.navigate(['login']);
    };
  };

  onReg(): void {
    this.authService.logout();
    this.router.navigate(['registration']);
  };
};
