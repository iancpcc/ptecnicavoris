import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFromNumber',
  standalone: true
})
export class ArrayFromNumberPipe implements PipeTransform {

  transform(value: number): number[] {
    
    return Array(value).fill(0).map((_, index) => index);;
  }

}
