import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',

})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: any, columns: any[]): any {

    if (!items) {
      return [];
    }
    if (!filter || !columns) {
      return items;
    }

    filter = filter.toString();
    if (filter !== '') {
      return items.filter(singleItem => {
        let result = false;

        for (const col of columns) {
          if (singleItem[col]) {
            if (singleItem[col].toString().toLowerCase().includes(filter.toLowerCase())) {
              result = true;
              break;
            }
          }

        }
        return result;
        }
      );
    }
  }
}
