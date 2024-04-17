import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Funflix_frontend';

  activeComponent = '' ;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeComponent = this.getCurrentRouteComponent();
        console.log('Aktive Komponente:', this.activeComponent);
      }
    });
  }

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
}
