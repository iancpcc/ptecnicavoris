import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
