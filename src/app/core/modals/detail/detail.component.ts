import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackdropService } from '../../services/backdrop/backdrop.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private router: Router,
    private backdropService: BackdropService
  ) {}

  @HostListener('document:keydown.escape', []) onKeydownEsc() {
    this.close();
  }

  ngOnInit(): void {
    this.backdropService.enable();
  }

  close() {
    this.router.navigate([{ outlets: { post: null } }]);
  }

  ngOnDestroy() {
    this.backdropService.disable();
  }
}
