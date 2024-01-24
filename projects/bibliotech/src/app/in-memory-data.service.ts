import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { USERS } from './mock-users';
import { BOOKS } from './mock-book';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor(){
    console.log('InMemoryDataService - constructor called');
  }

  createDb(){
    return { USERS, BOOKS };
  }
}
