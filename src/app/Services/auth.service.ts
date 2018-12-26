import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localStorageId = 'currentUser';

  create(token: string) {
    const temp = JSON.stringify({'key': token});
    localStorage.setItem(this.localStorageId, temp );
  }

  getToken() {
    const ls = localStorage.getItem(this.localStorageId);
    const data = JSON.parse(ls);
    return data.key;
  }

  getStatus(): boolean {
    const ls = localStorage.getItem(this.localStorageId);
    return Boolean(ls);
  }

  remove() {
    localStorage.removeItem(this.localStorageId);
  }
}
