import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { switchMap } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  item: any;

  newItem = {
    item_id: 0,
    title: '',
    description: '',
    duedate: '',
    tags: [],
    creator_id: 0
  }

  constructor( private detail: AppService, private route: ActivatedRoute, private dashboard: DashboardComponent) { }

  ngOnInit(): void {
    this.route.paramMap.pipe( 
      switchMap( params => {
        const id = params.get('id')
        return this.detail.getSingleItem(id)
    })
    ).subscribe(res =>{
      this.item = res
    })
  }

  // 

  handleTitle(event: any){
    event.preventDefault()
    this.newItem.title = event.target.value
  }
  handleDescription(event: any){
    event.preventDefault()
    this.newItem.description = event.target.value
  }
  handleDuedate(event: any){
    event.preventDefault()
    this.newItem.duedate = event.target.value
  }
  handleTags(event: any){
    event.preventDefault()
    this.newItem.tags = event.target.value.split(' ')
  }
  // 
  updateItem(){
    const currentUser = this.detail.getCurrentUser()
    if(this.item.creator_id === currentUser.user_id){
      this.newItem.creator_id = this.item.creator_id
      this.newItem.item_id = this.item.item_id
      if(this.newItem.description === ''){
        this.newItem.description = this.item.description
      }if(this.newItem.duedate === ''){
        this.newItem.duedate = this.item.duedate
      }if(this.newItem.title === ''){
        this.newItem.title = this.item.title
      }if(this.newItem.tags.length === 0){
        this.newItem.tags = this.item.tags
      }
      console.log('Authorized to updated')
      this.detail.updateItem(this.newItem).subscribe( res =>{
        this.item = res[0]
      })
      this.dashboard.updateData()

    }else{
      alert('Not authorized to update')
    }
  }
}
