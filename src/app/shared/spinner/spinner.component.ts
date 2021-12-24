import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from './../../core/services/loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnDestroy {
  showLoading: boolean;
  private unsubscribe = new Subject<void>();

  constructor(private loader: LoaderService) {
    this.loader.show
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value: boolean) => (this.showLoading = value));
    this.loader.hide();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
