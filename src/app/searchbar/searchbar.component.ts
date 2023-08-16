import { Component } from '@angular/core';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  item: string = '';

  constructor(private searchService: SearchService) {}

  checkItem() {
    return this.item;
  }

  performSearch() {
    this.searchService.setSearchTerm(this.item);
  }
}
