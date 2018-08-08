import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService,private router:Router,private FlashMessage:FlashMessagesService) { }

  ngOnInit() {
  }
  onLogoutClick(){
    this.auth.logout();
    this.FlashMessage.show('You have successfully Logged out!',{cssClass:'alert-success'});
    this.router.navigate(['/']);
    return false
  }
}
