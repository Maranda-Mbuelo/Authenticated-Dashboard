import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTermSubject = new BehaviorSubject<string>('');

  getSearchTermObservable() {
    return this.searchTermSubject.asObservable();
  }

  setSearchTerm(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }
}
