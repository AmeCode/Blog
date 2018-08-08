import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private FlashMessage:FlashMessagesService) { }
  signinForm:FormGroup;
  ngOnInit() {
    this.signinForm=new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required),
    })
  }
  onLoginSubmit(){
    const user={
      username:this.signinForm.value.username,
      password:this.signinForm.value.password
    }
    this.auth.authenticateUser(user).subscribe((data)=>{
      if(data['success']){
        this.FlashMessage.show('You have successfully logged in ! ',{cssClass:'alert-success',timeout:5000});
        this.router.navigate(['/dashboard']);
        this.auth.storeUserData(data['token'],data['user']);
      }
      else{
        this.FlashMessage.show(data['msg'],{cssClass:'alert-danger'})
      }
    })
  }

}
