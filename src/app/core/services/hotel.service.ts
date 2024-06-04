import { AppState, IApiResponse } from '../models/app-state.model';
import { BehaviorSubject, Observable, Subject, catchError, delay, map, of, startWith, take, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IHotel } from '../models/hotel.model';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  APP_STATE = AppState

  private hotels = new BehaviorSubject<IApiResponse<IHotel[]>>({} as IApiResponse<IHotel[]>);
  private hotelsList = this.hotels.asObservable();

  constructor(private http: HttpClient) {
    this.cargarListadoHoteles();
  }

  obtenerHoteles$ = (): Observable<IApiResponse<IHotel[]>> => {
    return this.hotelsList;
  }

  private cargarListadoHoteles() {
    return this.http.get<IHotel[]>(`${URL_BASE}/hotels`).pipe(
      delay(1000),
        map(r => ({ data: r, state: this.APP_STATE.LOADED })),
        take(1),
        startWith({ state: this.APP_STATE.LOADING }),
      catchError((err: HttpErrorResponse) => of({ state: this.APP_STATE.ERROR, error: err })),
    ).subscribe(
      resp=> this.hotels.next(resp)
    )
  }


}
