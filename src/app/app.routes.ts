import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Login } from './login/login';
import { HotelSearch } from './hotels/hotel-search/hotel-search';

export const routes: Routes = [
	{ path: '', component: Landing },
	{ path: 'login', component: Login },
	{ path: 'hotels', component: HotelSearch },
];
