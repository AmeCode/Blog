import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }
  user:object;
  ngOnInit() {

    this.auth.getProfile().subscribe((data)=>{
      this.user=data['user'];
    }),(err)=>{
      console.log(err);
    }
  }

}
