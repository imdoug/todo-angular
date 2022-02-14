import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class AppService{
    constructor(private http: HttpClient){}

    private todosSource = new BehaviorSubject<any>({})
    currentTodos = this.todosSource.asObservable()

    private userSource = new BehaviorSubject<any>({})
    currentUser = this.todosSource.asObservable()

    ROOT_URL = 'https://todo-database-api.herokuapp.com/'


    updateTodos(todos: any){
        this.todosSource.next(todos)
    }

    updateUser(user: any){
        this.todosSource.next(user)
    }
    // get all items
    getAllItems(){
        return this.http.get(this.ROOT_URL + 'items');
    }
    // 
    getSingleItem(id: any){
        return this.http.get(this.ROOT_URL + `items/${id}`);
    }
    // create new item 
    createItem(item: object){
        return this.http.post<any>(this.ROOT_URL + 'items', item)
    }
    // delete item
    deleteItem(id: number){
        return this.http.delete<any>(this.ROOT_URL + `items/${id}`)
    }
    // update item 
    updateItem(newItem: any){
        return this.http.put<any>(this.ROOT_URL + `items/${newItem.item_id}`, newItem)
    }

    //  USER // SESSIONS 
    //  create new user
    register(user:object){
        return this.http.post<any>(this.ROOT_URL + 'users', user)
    }
    // log user 
    login(user:object){
        return this.http.post<any>(this.ROOT_URL + 'sessions', user)
    }
    // 
    getCurrentUser(){
       const data: any = JSON.parse(window.localStorage.getItem('currentUser') ||  '{}')
       this.currentUser = data
        return data
    }
    
 }
