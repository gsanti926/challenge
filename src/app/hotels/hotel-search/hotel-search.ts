import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HotelsService } from '../../core/hotels/hotels.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { Destination } from '../../core/hotels/models/destination.model';

@Component({
  selector: 'app-hotel-search',
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-search.html',
  styleUrl: './hotel-search.scss',
})
export class HotelSearch {
  searchForm = new FormGroup({
    destination: new FormControl(''),
    checkin: new FormControl(''),
    checkout: new FormControl(''),
    rooms: new FormControl(1),
    guests: new FormControl(1),
  });

  hotelsService = inject(HotelsService);

  destinations = signal<Destination[]>([]);
  hotels = signal<any[]>([]);
  selectedDestination = signal<Destination | null>(null);
  loading = signal(false);

  constructor() {
    this.listenAutocomplete();
  }

  listenAutocomplete() {
    this.searchForm.controls.destination.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => this.hotelsService.autocomplete(value ?? '')),
      )
      .subscribe((res) => this.destinations.set(res));
  }

  selectDestination(dest: Destination) {
    this.selectedDestination.set(dest);
    this.searchForm.controls.destination.setValue(dest.displayName, { emitEvent: false });
    this.destinations.set([]);
  }

  search() {
    if (!this.selectedDestination()) return;

    this.loading.set(true);

    this.hotelsService
      .searchHotels({
        checkin: this.searchForm.value.checkin!,
        checkout: this.searchForm.value.checkout!,
        destination: this.selectedDestination()!.displayName,
        latitude: this.selectedDestination()!.lat,
        longitude: this.selectedDestination()!.lng,
        rooms: this.searchForm.value.rooms!,
        guests: this.searchForm.value.guests!,
      })
      .subscribe((res) => {
        this.hotels.set(res.hotels ?? []);
        this.loading.set(false);
      });
  }
}
