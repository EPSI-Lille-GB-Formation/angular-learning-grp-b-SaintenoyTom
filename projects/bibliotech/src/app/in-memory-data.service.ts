import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { USERS } from './mock-users';
import { BOOKS } from './mock-book';
import { CATEGORIES } from './mock-categories';
import { PAGES } from './mock-page';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    return { USERS, BOOKS, CATEGORIES, PAGES};
  }
}
