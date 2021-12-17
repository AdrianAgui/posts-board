import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BackdropService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  enable() {
    this.document.body.classList.add('overflow-hidden');
  }

  disable() {
    this.document.body.classList.remove('overflow-hidden');
  }
}
