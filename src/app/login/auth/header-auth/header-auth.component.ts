import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.css']
})
export class HeaderAuthComponent implements OnInit, OnDestroy {
  

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
   
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login/auth']);
  }

  ngOnDestroy() {
    
  }
}
