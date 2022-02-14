import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }
  currentUser: any

  loginError: any

  constructor(private login: AppService, private _router: Router) { }

  ngOnInit(): void {
    this.login.currentUser.subscribe( data => this.currentUser = data)
  }

  handleEmail(event: any){
    event.preventDefault()
    this.user.email = event.target.value
  }

  handlePassword(event: any){
    event.preventDefault()
    this.user.password = event.target.value
  }

  loginUser(){
    this.login.login(this.user)
      .subscribe( {
        next: (v) => {this.currentUser = v
          localStorage.setItem('currentUser', JSON.stringify(v));
          this._router.navigate(['dashboard'])
        },
        error: (e) => this.loginError = "Your email or password is incorrect, please try again."
      })
      console.log(this.loginError)
  }
}