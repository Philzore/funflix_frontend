import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  rememberMeActiv = false ;
  currentUser = '' ;
  currentVideoAuthor = '' ;

  constructor() { }
}
