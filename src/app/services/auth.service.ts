
import {Injectable, NgModule} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken:any;
  user:any;

  constructor(private http:HttpClient) { }

  registerUser(user){
    let headers= new HttpHeaders();
    headers.append('content-type','application/json');
    /*HttpClient.get() applies res.json() automatically and returns Observable<HttpResponse<string>>.
     You no longer need to call .map(res=>res.json()) function yourself.*/
    return this.http.post('http://localhost:3000/users/register'||'/users/register',user,{headers: headers});
  }
  authenticateUser(user){
    let headers= new HttpHeaders();
    headers.append('content-type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate'||'users/authenticate',user,{headers: headers});
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
  getProfile(){
    this.loadToken();
    let headers= new HttpHeaders({"Authorization":this.authToken});

    return this.http.get('http://localhost:3000/users/profile'||'users/profile',{headers: headers});
  }
  loadToken(){
    const Token=localStorage.getItem('id_token');
    this.authToken=Token;
  }
  loggedIn(){
    const helper = new JwtHelperService();
    if(this.authToken!==undefined){return !(helper.isTokenExpired(this.authToken));}

  }
}
