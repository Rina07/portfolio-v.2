import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ItemsService } from 'src/app/shared/items.service';
import { Item } from '../shared/interfaces';
import { Subscription, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
 
  public items: Item[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  tags = 'Technology stack';
  isLoaded = false;
  
  constructor(private itemsService: ItemsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.pSub = this.itemsService.getAll().subscribe(data => {
      
      this.isLoaded = true;
      
      this.items = data;
      console.log(data);
    })
    this.isLoaded = false;    
  }

  remove(id: string) {
    this.dSub = this.itemsService.remove(id).subscribe(() => {
      this.items = this.items.filter(el => el.id !== id);
    })
  }
  
  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
