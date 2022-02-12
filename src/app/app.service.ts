import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'

@Injectable({ providedIn: 'root'})
export class AppService{
    constructor(private http: HttpClient){}

    ROOT_URL = 'http://localhost:8000/'

    currentUser: any

    // get all items
    getAllItems(){
        return this.http.get(this.ROOT_URL + 'items');
    }
    // create new item 
    createItem(item: object){
        return this.http.post<any>(this.ROOT_URL + 'items', item)
    }
    // delete item
    deleteItem(id: number){
        return this.http.delete<any>(this.ROOT_URL + `items/${id}`)
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
