import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Funflix_frontend';

  activeComponent = '';
  hideHeader = true;
  hideFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeComponent = this.getCurrentRouteComponent();
        this.checkHide();
      }
    });
  }

  /**
   * get current active component
   * 
   * @returns current active component
   */
  getCurrentRouteComponent(): string | null {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    if (route.component) {
      return route.component['name'];
    }
    return null;
  }

  /**
   * hide header and footer in case of active component
   * 
   */
  checkHide() {
    if (this.activeComponent == 'LoginComponent' || this.activeComponent == 'DataProtectionComponent' || this.activeComponent == 'ImprintComponent' || this.activeComponent == 'ResetPasswordComponent') {
      this.hideHeader = true;
      this.hideFooter = true;
    } else {
      this.hideHeader = false;
      this.hideFooter = false;
    }
  }
}
