import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { HotelCardComponent } from './hotel-card.component';
import { IHotel } from '../../../core/models/hotel.model';

describe('HotelCardComponent', () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('Debe ser Creado', () => {
    expect(HotelCardComponent).toBeTruthy()
  })

  it('debe mostrar la informacion del hotel', () => {
    const hotel: IHotel = {
      id: '1',
      name: 'Producto 1',
      image: 'https://example.com/image.jpg',
      address: 'Calle Mayor, 123',
      stars: 4,
      rate: 4.5,
      price: 100
    };
    component.hotel = hotel;
    fixture.detectChanges();
    const hotelNameDe = fixture.debugElement.query(By.css('h2'))
    const hotelImgDe = fixture.debugElement.query(By.css('img'))
    const hotelNameElement = hotelNameDe.nativeElement
    const hotelImgElement = hotelImgDe.nativeElement
    expect(hotelNameElement.textContent).toContain(hotel.name);
    expect(hotelImgElement.src).toContain(hotel.image);
  });
});
