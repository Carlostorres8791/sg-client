import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, labelKey?: string): any[] {
    if (!searchTerm) {
      return items;
    }
    return items.filter(
      item =>
        item[labelKey || 'pname' || 'sname' || 'plastname' || 'slastname' || 'cedula' || 'email' ]
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) === true).slice(0, 10);
  }

}
