import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DestinationsService } from '../../../core/destinations/destinations.service';
import { DestinationAutocomplete } from '../../../core/destinations/interfaces/destination-autocomplete';
import { HotelsService, HotelSearchParams } from '../../../core/hotels/hotels.service';

@Component({
  selector: 'app-filters-hotel-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './filters-hotel-search.html',
  styleUrls: ['./filters-hotel-search.scss'],
})
export class FiltersHotelSearch implements OnInit {

  // Use the form control "destination" directly for the visible input
  results: DestinationAutocomplete[] = [];
  selectedDestination = signal<DestinationAutocomplete | null>(null);

  // Simplified guests handling without AbstractControl/FormArray
  guestsCounts: number[] = [1];

  filtersForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly destinationsService: DestinationsService,
    private readonly hotelsService: HotelsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initAutocomplete();
  }

  private initForm(): void {
    this.filtersForm = this.fb.group({
      destination: [''],
      latitude: [''],
      longitude: [''],
      checkin: [''],
      checkout: [''],
      rooms: [1],
      currency: ['USD'],
      per_page: [500],
      page: [1],
    });
  }

  private initAutocomplete(): void {
    const destinationCtrl = this.filtersForm.get('destination') as FormControl<string | null>;
    destinationCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value): value is string => !!value && value.length >= 3),
        switchMap(value => this.destinationsService.getDestinations(value))
      )
      .subscribe(res => this.results = res);
  }

  onKeyDown(event: KeyboardEvent): void {
    const destinationCtrl = this.filtersForm.get('destination') as FormControl<string | null>;
    const value = destinationCtrl?.value ?? '';
    if (value.length >= 3) {
      this.destinationsService.getDestinations(value).subscribe({
        next: res => {this.results = res.length > 0 ? res[0].result : [];
          debugger
        }
      });
    }
  }

  onSelect(dest: DestinationAutocomplete): void {
    this.selectedDestination.set(dest);

    // Set the visible input without re-triggering the autocomplete
    const destinationCtrl = this.filtersForm.get('destination') as FormControl<string | null>;
    destinationCtrl.setValue(dest.displayName, { emitEvent: false });

    this.filtersForm.patchValue({
      destination: dest.displayName,
      latitude: dest.lat,
      longitude: dest.lng,
    });
  }

  // --------------------
  // Guests helpers (no AbstractControl)
  // --------------------
  addRoom(): void {
    this.guestsCounts.push(1);
    this.filtersForm.patchValue({ rooms: this.guestsCounts.length });
  }

  removeRoom(index: number): void {
    this.guestsCounts.splice(index, 1);
    this.filtersForm.patchValue({ rooms: this.guestsCounts.length });
  }

  onRoomsChange(): void {
    const rooms = Number(this.filtersForm.get('rooms')?.value) || 0;
    if (rooms < 0) return;
    // Resize guestsCounts to match rooms
    if (rooms > this.guestsCounts.length) {
      const toAdd = rooms - this.guestsCounts.length;
      for (let i = 0; i < toAdd; i++) this.guestsCounts.push(1);
    } else if (rooms < this.guestsCounts.length) {
      this.guestsCounts.splice(rooms);
    }
  }

  search(): void {
    if (!this.selectedDestination()) return;

    const formValue = this.filtersForm.value as any;
    const params: HotelSearchParams = {
      checkin: formValue.checkin,
      checkout: formValue.checkout,
      destination: formValue.destination,
      latitude: formValue.latitude,
      longitude: formValue.longitude,
      rooms: formValue.rooms,
      guests: this.guestsCounts,
      currency: formValue.currency,
      per_page: formValue.per_page,
      page: formValue.page,
      price_low: '',
      price_high: '',
      v: '1018293'
    };

    console.log('Query params finales 👉', params);
    this.hotelsService.search(params).subscribe({
      next: (res) => {
        console.log('Hotels search response 👉', res);
      },
      error: (err) => {
        console.error('Hotels search error ❌', err);
      }
    });
  }
}
