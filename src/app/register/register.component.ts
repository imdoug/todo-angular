import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private register: AppService, private _router: Router) { }

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

  createUser(){
    this.register.register(this.user)
      .subscribe( res => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        this._router.navigate(['dashboard'])
      })
  }

}