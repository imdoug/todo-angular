import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemID: any

  todos : any

  currentUser: any

  newTodo = {
    title: '',
    description: '',
    duedate: '',
    tags: [],
    creator_id: 0
  }

  constructor(private appService: AppService,  private _router: Router) {}
  
  // HANDELING STATE CHANGE 

  handleTitle(event: any){
    event.preventDefault()
    this.newTodo.title = event.target.value
  }
  handleDescription(event: any){
    event.preventDefault()
    this.newTodo.description = event.target.value
  }
  handleDuedate(event: any){
    event.preventDefault()
    this.newTodo.duedate = event.target.value
  }
  handleTags(event: any){
    event.preventDefault()
    this.newTodo.tags = event.target.value.split(' ')
  }

  // ITEM ACTIONS 
  createTodo(){
    this.newTodo.creator_id = this.currentUser.user_id
    this.appService.createItem(this.newTodo)
      .subscribe( res => {
        this.appService.getAllItems().subscribe(data => this.todos = data)
    })
  }
  deleteTodo(id: any){
    this.appService.deleteItem(id).subscribe( res =>{
      this.appService.getAllItems().subscribe(data => this.todos = data)
    })
  }
  // get all items 
  get(){
    this.currentUser = this.appService.getCurrentUser()
  }
  // 
  goToDetail(id: string){
    this._router.navigate([`detail/${id}`])
  }

  ngOnInit(): void {
    this.appService.getAllItems().subscribe(data => this.todos = data)
  }
  
  logout(){
    localStorage.removeItem("currentUser");
  }

}
