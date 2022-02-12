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
  constructor(private login: AppService, private _router: Router) { }

  ngOnInit(): void {

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
      .subscribe( res => {
        localStorage.setItem('currentUser', JSON.stringify(res));
      })
  }
}
