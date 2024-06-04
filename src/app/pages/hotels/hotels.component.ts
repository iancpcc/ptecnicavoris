import { AppState, IApiResponse } from '../../core/models/app-state.model';
import { Component, ElementRef, NgModule, OnDestroy, OnInit, effect, inject, signal } from '@angular/core';
import { Observable, Subject, filter, map, take, takeUntil } from 'rxjs';

import { ArrayFromNumberPipe } from '../../core/pipes/array-from-number.pipe';
import { CommonModule } from '@angular/common';
import { HotelCardComponent } from '../../shared/components/hotel-card/hotel-card.component';
import { HotelService } from '../../core/services/hotel.service';
import { IFilterProperties } from '../../core/models/filter-properties.enum';
import { IHotel } from '../../core/models/hotel.model';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, ArrayFromNumberPipe, HotelCardComponent],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit, OnDestroy {



  hoteService = inject(HotelService)
  elementRef = inject(ElementRef)
  APP_STATE = AppState //Para manejar el estado de los datos en el template y aqui
  FILTRO_TIPO = IFilterProperties

  hotelsPaginados: IApiResponse<IHotel[]> = { state: this.APP_STATE.LOADING, data: [] }; //Almacena el listado de hoteles paginados

  // Signal para manejar el estado de los filtros
  filterOptions = signal({
    name: '',
    price: null,
    rate: null,
    starts: [] as number[]
  })
  // Variables para mostrar en el template la informacion de la paginacion
  currentPage = 1;
  totalRecords = 0;
  totalPages = 0;
  // Cerrar Suscripcion
  endSuscripition$ = new Subject();

  ngOnInit(): void {
    this.hoteService.obtenerHoteles$().pipe(
      takeUntil(this.endSuscripition$)
    )
      .subscribe(
        response => {
          this.hotelsPaginados = { ...response }; //Obtengo los datos
          this.hotelsPaginados.data = this.paginarHoteles(this.hotelsPaginados.data!, 1) //Pagino la data y que se muestre la pagina 1
        }

      )
  }

  ngOnDestroy(): void {
    this.endSuscripition$.unsubscribe() //Me desuscribo 
  }



  paginarHoteles(hotels: IHotel[], pageNumber: number): IHotel[] {
    if (!hotels) { return [] }
    const pageSize = 10; //El limite de paginacion va a ser de 10 items por pagina
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, hotels.length);
    this.totalPages = Math.ceil(hotels.length / pageSize);
    this.totalRecords = hotels.length;
    this.currentPage = hotels.length > 1 ? pageNumber : 0;
    return hotels.slice(startIndex, endIndex);
  }


  onFilter(tipo: IFilterProperties, valor: number | string) {
    // Actualizo todas las propiedades del filtro 
    this.filterOptions.update(r => {
      switch (tipo) {
        case (this.FILTRO_TIPO.PRICE):
          r.price = valor as never
          break;
        case (this.FILTRO_TIPO.RATE):
          r.rate = valor as never
          break;
        case (this.FILTRO_TIPO.NAME):
          r.name = valor as string
          break;
        default:
          break;
      }
      return r;
    })
    // empiezo a filtrar
    this.filterOriginalList().subscribe(lista => {
      this.hotelsPaginados.data = this.paginarHoteles(lista, 1) //Por cada filtrado  realizo nuevamente la paginacion
    })

  }

  filterOriginalList() {
    // Destructuro las variables del signal para trabajar mas facil
    const { name, price, rate, starts } = this.filterOptions();
    // filtro por nombre, precio, valoracion y estrellas
    return this.hoteService.obtenerHoteles$().pipe(
      map(
        lista => {
          return lista.data!.filter(hotel => {
            if (name && !hotel.name.toLowerCase().includes(name.toLowerCase())) {
              return;
            }
            if (price && hotel.price > price) {
              return;
            }
            if (rate && hotel.rate < rate) {
              return
            }
            if (!starts.includes(hotel.stars) && starts.length != 0) {
              return
            }
            return lista;
          })
        }),
      takeUntil(this.endSuscripition$) //destruyo la suscripcion
    )

  }

  // Este filtrado es por categoria de estrellas
  seleccionaCategoria(event: Event, valor: number) {
    const inputElement = event.target as HTMLInputElement;
    this.filterOptions.update(h => {
      if (inputElement.checked) {
        h.starts.push(valor)
      }
      else {
        h.starts = h.starts.filter(v => v != +inputElement.id)
      }
      return h;
    })

    this.filterOriginalList().subscribe(lista => {
      this.hotelsPaginados.data = this.paginarHoteles(lista, 1)
    })

  }


  nextOrPreviusPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) return
    // const hotel = 
    this.currentPage = pageNumber;
    console.log(this.currentPage)
    this.filterOriginalList().subscribe(lista => {
      this.hotelsPaginados.data = this.paginarHoteles(lista, pageNumber)
    })
  }


  //Reseteo variables, listado y elementos del DOM
  restablecer(event: Event) {
    event.preventDefault()
    this.filterOptions.set({ price: null, rate: null, starts: [], name: '' })
    this.filterOriginalList().subscribe(lista => {
      this.hotelsPaginados.data = this.paginarHoteles(lista, 1)
    })
    let form = this.elementRef.nativeElement.querySelector('form');
    form.reset();

  }

}
