import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  private checkViewport(): void {
    const isMobile = window.innerWidth <= 768;
    this.isMobileSubject.next(isMobile);
  }
}
