import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

validateUser(user:User){
  let users :User[] = [];
  const storedUsers = localStorage.getItem('Users');
  if(storedUsers){
    users = JSON.parse(storedUsers);
  }
  return users.find(u => u.userName == user.userName && u.password == user.password);
}
}
