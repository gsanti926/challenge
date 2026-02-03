import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { HotelService } from '../../core/services/hotel.service';
import { AutocompleteItem, Hotel, HotelSearchParams } from '../../core/services/hotel.interfaces';

@Component({
  selector: 'app-hotel-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-search.html',
  styleUrl: './hotel-search.scss',
})
export class HotelSearch {
  searchText: string = '';
  checkin: string = '';
  checkout: string = '';

  autocompleteResults: AutocompleteItem[] = [];
  selectedDestination: AutocompleteItem | null = null;
  hotels: Hotel[] = [];

  showAutocomplete: boolean = false;
  loadingAutocomplete: boolean = false;
  loadingHotels: boolean = false;
  error: string = '';

  private searchSubject = new Subject<string>();

  constructor(private hotelService: HotelService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(text => {
        if (text.length < 2) {
          return of([]);
        }
        this.loadingAutocomplete = true;
        return this.hotelService.autocomplete(text);
      })
    ).subscribe({
      next: (results) => {
        this.autocompleteResults = results;
        this.showAutocomplete = results.length > 0;
        this.loadingAutocomplete = false;
      },
      error: (err) => {
        console.error('Autocomplete error:', err);
        this.loadingAutocomplete = false;
        this.autocompleteResults = [];
      }
    });
  }

  onSearchInput(): void {
    this.selectedDestination = null;
    this.searchSubject.next(this.searchText);
  }

  selectDestination(item: AutocompleteItem): void {
    this.selectedDestination = item;
    this.searchText = item.displayName;
    this.showAutocomplete = false;
    this.autocompleteResults = [];
  }

  searchHotels(): void {
    this.error = '';

    if (!this.selectedDestination) {
      this.error = 'Please select a destination from the suggestions';
      return;
    }

    if (!this.checkin || !this.checkout) {
      this.error = 'Please select check-in and check-out dates';
      return;
    }

    const params: HotelSearchParams = {
      checkin: this.checkin,
      checkout: this.checkout,
      destination: this.selectedDestination.displayName,
      latitude: parseFloat(this.selectedDestination.lat),
      longitude: parseFloat(this.selectedDestination.lng),
      rooms: 1,
      guests: [2],
      currency: 'USD',
      per_page: 20,
      page: 1,
      price_low: '',
      price_high: ''
    };

    this.loadingHotels = true;
    this.hotelService.searchHotels(params).subscribe({
      next: (response) => {
        this.hotels = response.hotels;
        this.loadingHotels = false;
      },
      error: (err) => {
        console.error('Hotel search error:', err);
        this.error = 'Failed to search hotels. Please try again.';
        this.loadingHotels = false;
      }
    });
  }

  hideAutocomplete(): void {
    setTimeout(() => {
      this.showAutocomplete = false;
    }, 200);
  }

  getImageUrl(image: string): string {
    if (image.startsWith('//')) {
      return 'https:' + image;
    }
    return image;
  }
}
