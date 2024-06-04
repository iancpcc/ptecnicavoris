import { Component, Input } from '@angular/core';

import { ArrayFromNumberPipe } from '../../../core/pipes/array-from-number.pipe';
import { CommonModule } from '@angular/common';
import { IHotel } from '../../../core/models/hotel.model';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [ArrayFromNumberPipe, CommonModule],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.scss'
})
export class HotelCardComponent {

  @Input() hotel!: IHotel
  
  constructor() {
    this.hotel = {
          id: '1',
          name: 'Producto 1',
          image: 'https://example.com/image.jpg',
          address: 'Calle Mayor, 123',
          stars: 4,
          rate: 4.5,
          price: 100
        };
  }

}
