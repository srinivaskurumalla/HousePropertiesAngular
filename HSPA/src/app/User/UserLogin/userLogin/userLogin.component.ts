import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService:AuthService,private alertService:AlertifyService,
              private router:Router) { }

  ngOnInit() {
  }

  Login(formValue: NgForm){
    console.log(formValue.value);
    const validUser =  this.authService.validateUser(formValue.value);
    if(validUser){
      localStorage.setItem('token',validUser.userName);
      this.alertService.success('login successfull');
      console.log('login successful');
      this.router.navigate(['/']);
    }
    else{
      this.alertService.error('login failed');
      console.log('login failed');
    }
  }
}
