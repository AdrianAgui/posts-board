import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent implements OnInit {
  faSearch = faSearch;

  @Output() onFilterChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  filterChange(event: any) {
    this.onFilterChange.emit(event.value);
    console.log(event.value);
  }

  focusInput() {
    document.getElementById('filter')?.focus();
  }
}
