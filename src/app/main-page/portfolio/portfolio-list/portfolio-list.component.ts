import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ItemsService } from 'src/app/shared/items.service';
import { Observable } from 'rxjs';
import { Item } from '../../../login/shared/interfaces';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css'],
  animations: [
    trigger('listAnimation', [
      state('start', style({
        opacity: 0
      })),
      state('end', style({
        opacity: 1
      })),
      transition('start => end', [
        animate('1s ease-in-out')
      ]),
      transition('end => start', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})

export class PortfolioListComponent implements OnInit {
  
  state = 'start';
  items$: Observable<Item[]>
  
  constructor(@Inject(DOCUMENT) private document: Document, private itemsService: ItemsService) { }

  ngOnInit() {
    this.items$ = this.itemsService.getAll();    
  }
 
  @HostListener('window: scroll', [])

  onWindowScroll() {
    if (document.body.scrollTop > 220 || document.documentElement.scrollTop > 220) {
      this.state = 'end'; 
    } else {      
      this.state = 'start';
    }
  }
}
