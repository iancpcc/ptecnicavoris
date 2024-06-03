import { Component, NgModule, OnInit, inject, signal } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { ArrayFromNumberPipe } from '../../core/pipes/array-from-number.pipe';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../core/services/hotel.service';
import { IHotel } from '../../core/models/hotel.model';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, ArrayFromNumberPipe],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit {

  hoteService = inject(HotelService)

  hotels: IHotel[] = [];


  filterOptions = signal({
    price: 0,
    rate: 0,
    starts: [] as number[]

  })
  currentPage = 1;
  totalRecords = 0;
  totalPages: number= 0;

  ngOnInit(): void {
    this.filtrarYCargarHoteles().subscribe(res => {
      this.hotels = res;
    })
   
  }

  paginateArray( pageNumber: number):Observable< IHotel[]> {
    return this.hoteService.obtenerHoteles$().pipe(
      map(
        res => {
          const pageSize = 10;
          this.currentPage = pageNumber;
          const startIndex = (pageNumber - 1) * pageSize;
          const endIndex = Math.min(startIndex + pageSize, res.length);
          this.totalPages =   Math.ceil(res.length / pageSize);
          this.totalRecords = res.length;
          return res.slice(startIndex, endIndex);
          
         }
  
      )
     );
    
  }

  valorCambio(tipo: string, valor: number) {
    this.filterOptions.update(r => {
      switch (tipo) {
        case ('price'):
          r.price = valor
            // this.hotels = this.hoteService.obtenerHoteles$().pipe(map(r => r.filter(val => val.price <= valor)))
          break;
        case ('rate'):
          r.rate = valor
          // this.hotels = this.hoteService.obtenerHoteles$().pipe(map(r => r.filter(val => val.rate >= valor)))
          break;
        default:
          break;

      }
      return r;
    })

    this.filtrarYCargarHoteles()

    // this.hoteService.obtenerHoteles$().pipe(map(r => r.filter(val => val.price <= valor)))
  }

  valorCheckCambio(event: Event, valor: number) {
    const inputElement = event.target as HTMLInputElement;
    this.filterOptions.update(h => {
      if (inputElement.checked) {
        h.starts.push(valor)
      }
      else {
        h.starts = h.starts.filter(v => v != +inputElement.id)
      }
      // if (h.starts.length != 0) {
      //   this.hotels = this.hoteService.obtenerHoteles$().pipe(map(r => r.filter(val => h.starts.includes(val.stars))))

      // }
      // else {
      //   this.hotels = this.hoteService.obtenerHoteles$()
      // }
      this.filtrarYCargarHoteles()

      return h;
    })

  }

  filtrarYCargarHoteles()  {
    const {price, rate , starts} = this.filterOptions();
    return this.hoteService.obtenerHoteles$().pipe(map(h => {
      return h.filter(r => {
        if ((price != 0 || price <= r.price) && (rate != 0 && rate >= r.rate) && (starts.length > 0 || starts.includes(r.stars))){
        }
        return r
        
      })



    }))
      
  }



}
