import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  setSearchTerm(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }
}
