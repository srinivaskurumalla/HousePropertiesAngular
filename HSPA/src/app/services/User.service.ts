import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor() { }

addUser(user: User){
  let users = [];
  const storedUsers = localStorage.getItem('Users');
  if(storedUsers){
    users = JSON.parse(storedUsers);
    users = [user, ...users];
  } else {
    users = [user]
  }

  localStorage.setItem('Users',JSON.stringify(users))
}
}
