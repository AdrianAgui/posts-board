import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  display() {
    this.show.next(true);
  }

  hide() {
    this.show.next(false);
  }
}
