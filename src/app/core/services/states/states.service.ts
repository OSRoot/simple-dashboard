import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private showFormSource = new BehaviorSubject<boolean>(false);
  showForm$ = this.showFormSource.asObservable();
  private activeRouteSource = new BehaviorSubject<string>('');
  activeRoute$ = this.activeRouteSource.asObservable();
  constructor() { }

  toggleForm(show: boolean) {
    this.showFormSource.next(show);
  }

  setActiveRoute(route: string) {
    console.log(route)
    this.activeRouteSource.next(route);
  }
}
