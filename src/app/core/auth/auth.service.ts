import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Airline {
  id: number;
  name: string;
  code: string;
  display_name: string;
}

export interface LoginRequest {
  airline: string;
  employee_number: string;
  password: string;
  remember_me: string;
  redirect: string;
  check_generic: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: any;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private airlinesUrl = 'https://beta.id90travel.com/airlines';
  private sessionsUrl = 'https://beta.id90travel.com/api/v1/sessions';
  private appVersion = '1018293';

  constructor(private http: HttpClient) {}

  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.airlinesUrl);
  }

  login(airlineCode: string, employeeNumber: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'x-api-call-v2': 'true',
      'x-app-name': 'angular-desktop',
      'x-app-version': this.appVersion
    });

    const body: LoginRequest = {
      airline: airlineCode,
      employee_number: employeeNumber,
      password: password,
      remember_me: '1',
      redirect: '/',
      check_generic: true
    };

    return this.http.post<LoginResponse>(
      `${this.sessionsUrl}?v=${this.appVersion}`,
      body,
      { headers }
    ).pipe(
      tap(() => {
        this.loggedIn = true;
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
