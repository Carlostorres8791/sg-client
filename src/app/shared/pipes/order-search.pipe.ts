import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderSearch'
})
export class OrderSearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, labelKey?: string): any[] {

    if (!searchTerm) {
      return items;
    }
    console.log(items,searchTerm,labelKey)

    return items.filter(
      item =>
        item['vehicle'][ labelKey || 'pname' || 'sname' || 'plastname' || 'slastname' || 'cedula' || 'email' ]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) === true).slice(0, 10);

  }

}
