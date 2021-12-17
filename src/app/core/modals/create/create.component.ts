import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(private router: Router) {}

  @HostListener('document:keydown.escape', []) onKeydownEsc() {
    this.close();
  }

  ngOnInit(): void {}

  close() {
    this.router.navigate([{ outlets: { post: null } }]);
  }
}
