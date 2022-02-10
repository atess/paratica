import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string) {
    const data = localStorage.getItem(key);

    try {
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      return localStorage.getItem(key);
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
