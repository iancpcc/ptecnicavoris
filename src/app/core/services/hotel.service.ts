import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IHotel } from '../models/hotel.model';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hotels : Observable<IHotel[]>= new Observable()

  constructor(private http: HttpClient) { 
    this.hotels = this.cargarListadoHoteles();

  }

  obtenerHoteles$ = (): Observable<IHotel[]> => {
    return this.hotels 
  }
  
  private cargarListadoHoteles() {
    return this.http.get<IHotel[]>(`${URL_BASE}/hotels`)
    
  }

  

}
