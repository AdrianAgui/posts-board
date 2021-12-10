import { Component, OnInit } from '@angular/core';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;

  constructor() {}

  ngOnInit(): void {}
}
