import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/login/auth/auth.service';
import { ScrollerService } from '../../shared/scroller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(@Inject(DOCUMENT) private document: Document, public auth: AuthService, private scrollerService: ScrollerService) {}

  @HostListener('window: scroll', [])
  
  onWindowScroll() {
    if(document.body.scrollTop > 657 || document.documentElement.scrollTop > 657) {
      document.querySelector('.navbar-wrapper').classList.add('navbar-light', 'shadow', 'mb-5');
    } else if(document.body.scrollTop <= 657 || document.documentElement.scrollTop <= 657) {
      document.querySelector('.navbar-wrapper').classList.remove('navbar-light', 'shadow', 'mb-5');
    }
  }

  onClickScroll(elementId: string): void {
    this.scrollerService.onClickScroll(elementId);
    document.querySelector('.navbar-toggler').classList.add('collapsed');
    document.querySelector('.collapse').classList.remove('show');
  }  
}
