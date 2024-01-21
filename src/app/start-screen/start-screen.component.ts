import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  headerLinks = ['Upload','Video List', 'Logout'];
  footerLinks = ['Data Protection', 'Imprint'];
  activeLink = this.headerLinks[0];
  background: ThemePalette = undefined;

  videoListActive = true ;



}
