import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService, Airline } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
  airlines: Airline[] = [];
  selectedAirline: number | null = null;
  employeeNumber: string = '';
  password: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAirlines();
  }

  loadAirlines(): void {
    this.loading = true;
    this.authService.getAirlines().subscribe({
      next: (data) => {
        this.airlines = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load airlines';
        this.loading = false;
        console.error('Error loading airlines:', err);
      }
    });
  }

  onSubmit(): void {
    this.error = '';

    if (!this.selectedAirline || !this.employeeNumber || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    const airline = this.airlines.find(a => a.id === this.selectedAirline);
    if (!airline) {
      this.error = 'Invalid airline selected';
      return;
    }

    this.loading = true;
    this.authService.login(
      airline.code,
      this.employeeNumber,
      this.password
    ).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/hotels']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      }
    });
  }

  customSearchFn(term: string, item: Airline): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) ||
           item.code.toLowerCase().includes(term);
  }
}
