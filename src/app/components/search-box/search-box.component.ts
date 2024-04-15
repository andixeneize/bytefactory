import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent  {
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public onSearchTermChange(searchTerm: string): void {
    if (searchTerm !== null) {
      this.searchTermChange.emit(searchTerm);
    }
  }
}
