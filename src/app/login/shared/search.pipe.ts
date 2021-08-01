import {Pipe, PipeTransform} from '@angular/core';
import {Item} from './interfaces';

@Pipe({
    name: 'searchProjects'
})

export class SearchPipe implements PipeTransform {
    transform(items: Item[], search = ''):Item[] {
        if(!search.trim()) {
            return items;
        }
        return items.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        })
    }
}
