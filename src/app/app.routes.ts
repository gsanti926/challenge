import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Login } from './login/login';
import { HotelSearch } from './hotels/hotel-search/hotel-search';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
	{ path: '', component: Landing },
	{ path: 'login', component: Login, canActivate: [loginGuard] },
	{ path: 'hotels', component: HotelSearch, canActivate: [authGuard] },
];
