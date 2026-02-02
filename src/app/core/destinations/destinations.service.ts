import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { DestinationAutocomplete } from './interfaces/destination-autocomplete';

@Injectable({
  providedIn: 'root',
})
export class DestinationsService {

  private readonly baseUrl = 'https://beta.id90travel.com/api/v1/autocomplete';
  private readonly version = '1018293';

  constructor(private http: HttpClient) {}

  getDestinations(text: string): Observable<DestinationAutocomplete[]> {
    const params = new HttpParams()
      .set('text', text)
      .set('v', this.version);

    return this.http.get<DestinationAutocomplete[]>(this.baseUrl, { params });
  }

}
