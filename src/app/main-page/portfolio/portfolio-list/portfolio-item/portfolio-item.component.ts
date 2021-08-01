import { Component, Input } from '@angular/core';
import { Item } from 'src/app/login/shared/interfaces';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']  
})

export class PortfolioItemComponent {

  @Input() project: Item; 
  
}
