import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo Cloud';

  todo : any;

  todos: any

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getAllItems().subscribe(data => this.todo = data)
    this.appService.currentTodos.subscribe(todos => this.todos = todos)  
  }
  
}
