import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../service/backend.service';

@Component({
  selector: 'app-activate-screen',
  standalone: true,
  imports: [],
  templateUrl: './activate-screen.component.html',
  styleUrl: './activate-screen.component.scss'
})
export class ActivateScreenComponent implements AfterViewInit, OnInit{
  uidb64: string ;
  token: string ;
  message = '' ;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.checkActivation();

    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 2000);
  }

  async checkActivation() {
    this.route.params.subscribe((params) => {
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
    });
    let resp = await this.backendService.activateAccount(this.uidb64, this.token);
    this.message = resp['message'];
  }
}
