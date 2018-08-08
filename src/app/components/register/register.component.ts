
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private FlashMessage:FlashMessagesService, private auth:AuthService, private router:Router){}
  authToken:any;
  User:any;
  signupForm:FormGroup;
  ngOnInit(){
    this.signupForm=new FormGroup({
      'name': new FormControl(null,Validators.required),
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email])
    })
  }
  onRegisterSubmit(){
    if(!this.signupForm.invalid){

      const user={
        name:this.signupForm.value.name,
        username:this.signupForm.value.username,
        password:this.signupForm.value.password,
        email:this.signupForm.value.email
      };

/*`{
 name:${this.signupForm.value.name},
 username:${this.signupForm.value.username},
 password:${this.signupForm.value.password},
 email:${this.signupForm.value.email}
}`*/
      this.auth.registerUser(user).subscribe((data)=>{
        if(data['success']){
          this.FlashMessage.show('You are now registered. Please login!',{cssClass:'alert-success'});
          this.router.navigate(['/login']);
        }
        else(this.FlashMessage.show('Make sure your username name is unique!',{cssClass:'alert-danger'}))
      })
    }

  }
}
