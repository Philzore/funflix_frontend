import { Injectable } from '@angular/core';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  rememberMeActiv = false;
  currentUser = '';
  currentVideoAuthor = '';

  userContent = [];

  constructor() { }


  saveContentInLocalStorage() {
    const localStorageKey = 'userContentData';

    const userData = this.userContent.map(user => ({
      username: user.username,
      imageObjectLength: user.imageObject.length
    }));

    const userDataJSON = JSON.stringify(this.userContent);
    localStorage.setItem(localStorageKey, userDataJSON);
  }

  loadContentFromLocalStorage() {
    const localStorageKey = 'userContentData';
    const storedDataJSON = localStorage.getItem(localStorageKey);
    if (storedDataJSON) {
      const storedData = JSON.parse(storedDataJSON);
      this.userContent = storedData.map(userData => new User(userData));
    }
  }
}
