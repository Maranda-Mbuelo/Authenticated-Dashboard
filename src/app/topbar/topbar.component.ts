import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  @Input() username!: string;
  searchSubscription!: Subscription;
  searchText: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchSubscription = this.searchService
      .getSearchTermObservable()
      .subscribe((searchTerm) => {
        this.searchText = searchTerm;
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
