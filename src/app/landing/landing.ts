import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
})
export class Landing {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
