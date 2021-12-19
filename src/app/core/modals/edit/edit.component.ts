import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackdropService } from '../../services/backdrop/backdrop.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(
    private router: Router,
    private backdropService: BackdropService
  ) {}

  ngOnInit(): void {
    this.backdropService.enable();
  }

  close() {
    this.router.navigate([{ outlets: { post: null } }]);
    this.backdropService.disable();
  }
}
