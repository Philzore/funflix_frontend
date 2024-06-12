import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Funflix_frontend';
 
  hideHeader = true;
  hideFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkHide();
      }
    });
  }

  ngOnInit(): void {
   
}

  /**
   * hide header and footer in case of active component
   * 
   */
  checkHide() {
    const currentUrl = this.router.url;
    const hiddenUrls = ['/', '/data-protection', '/imprint', '/reset', '/activate/:uidb64/:token', '/reset/:uidb64/:token']
    if (hiddenUrls.includes(currentUrl)) {
      this.hideHeader = true;
      this.hideFooter = true;
    } else {
      this.hideHeader = false;
      this.hideFooter = false;
    }
  }
}
