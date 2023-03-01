import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-UserRegistration',
  templateUrl: './UserRegistration.component.html',
  styleUrls: ['./UserRegistration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  user!: User;

  formSubmitted : boolean = false;

  userName:string = '';
  userEmail : string= '';
  password : string = '';
  confirmPassword :  string = '';
  Mobile : string = '';
  constructor(private fb:FormBuilder, private userService :UserService,private alertService:AlertifyService) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName : new FormControl(null,Validators.required),
    //   userEmail : new FormControl(null,[Validators.required, Validators.email]),
    //   password : new FormControl(null,[Validators.required,Validators.minLength(5)]),
    //   confirmPassword : new FormControl(null,Validators.required),
    //   Mobile: new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)])
    // },{validators : this.checkPasswords});

    //this.registrationForm.controls['userName'].setValue('default name');

    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName : [null,Validators.required],
      userEmail : [null,[Validators.required, Validators.email]],
      password : [null,[Validators.required,Validators.minLength(5)]],
      confirmPassword : [null,Validators.required],
      Mobile: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    },{validators : this.checkPasswords});

  }
  checkPasswords(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordNotMatched: true };
  }
  Register(){
    console.log(this.registrationForm.value);
    this.formSubmitted = true;
    if(this.registrationForm.valid){
     // this.user = Object.assign(this.user,this.registrationForm.value);
      // localStorage.setItem('Users',JSON.stringify(this.user));
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.formSubmitted = false;

      this.alertService.success('Congrats registered successfully');
    }
    else{
      this.alertService.error('Kindly Provide the required fields');
    }
  }


  userData() : User  {
    return this.user = {
      userName : this.Name.value,
      userEmail : this.email1.value,
      password : this.pswrd.value,
      mobile : this.mobile.value
    }
  }

  //-----------------------------------
  //Getter methods for all form controls
  //-------------------------------------

  get Name(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get email1(){
    return this.registrationForm.get('userEmail') as FormControl;
  }

  get pswrd(){
    return this.registrationForm.get('password') as FormControl;
  }
  get cPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return this.registrationForm.get('Mobile') as FormControl;
  }
}
