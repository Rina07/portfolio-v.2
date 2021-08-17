import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations: [
    trigger('name', [
      state('start', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start <=> end', [
        animate('0.4s ease-in-out')
      ])
    ]),
    trigger('description', [
      state('start', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start <=> end', [
        animate('0.4s ease-in-out')
      ])
    ]),
    trigger('button', [
      state('start', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start <=> end', [
        animate('0.4s ease-in-out')
      ])
    ])
  ]
})

export class MainPageComponent {
  name = 'IRYNA BORNIAK';  
  stateName = 'start';
  stateDescription = 'start';
  stateButton = 'start';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener('window: scroll', [])

  onWindowScroll() {
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
      this.stateName = 'end';
    } else if(document.body.scrollTop <= 120 || document.documentElement.scrollTop <= 120) {
      this.stateName = 'start';
    }
    if(document.body.scrollTop > 240 || document.documentElement.scrollTop > 240) {
      this.stateDescription = 'end';
    } else if(document.body.scrollTop <= 240 || document.documentElement.scrollTop <= 240) {
      this.stateDescription = 'start';
    }
    if(document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      this.stateButton = 'end';
    } else if(document.body.scrollTop <= 350 || document.documentElement.scrollTop <= 350) {
      this.stateButton = 'start';
    }
  }

  printCV() {
    window.print();
  }
}
