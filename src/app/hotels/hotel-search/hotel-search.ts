import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FiltersHotelSearch} from './filters-hotel-search/filters-hotel-search';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [
    FiltersHotelSearch
  ],
  templateUrl: './hotel-search.html',
  styleUrls: ['./hotel-search.scss'],
})
export class HotelSearch implements OnInit {

  destinationForm!: FormGroup;


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.destinationForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      Remember: [false]
    });

  }

}

