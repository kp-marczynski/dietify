import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLayoutCardService {

  private visibilityMainCardContainerSubject = new Subject<boolean>();

  visibilityMainCardContainer$ = this.visibilityMainCardContainerSubject.asObservable();

  // to hide main card container from child component call this method in child's ngOnInit method
  changeMainCardContainerVisibility(visibility: boolean) {
    this.visibilityMainCardContainerSubject.next(visibility);
  }
}
