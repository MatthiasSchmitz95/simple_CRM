import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | null): string {
    if (value === null) {
      return '';
    }
    return value.toLocaleString('en-US');
  }
}
