import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ImprintComponent } from './imprint/imprint.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';




const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'start-screen' , component: StartScreenComponent},
  {path: 'imprint' , component: ImprintComponent},
  {path: 'data-protection' , component: DataProtectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
