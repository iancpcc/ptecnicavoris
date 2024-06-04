import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelService } from '../../core/services/hotel.service';
import { HotelsComponent } from './hotels.component';
import { HttpClientModule } from '@angular/common/http';

describe('HotelsComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsComponent, HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
