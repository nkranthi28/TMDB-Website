import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState, LayoutModule } from '@angular/cdk/layout';


@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./watch.component.css']
})

export class WatchComponent implements OnInit {

  id: any;
  media_type: any;
  incoming_data:any;
  video: any;
  details: any;
  cast: any;
  reviews: any;
  reviewslength: any;
  cast_details:any;
  cast_externals: any;
  recommended: any;
  similar: any;
  similar_array: any = [];
  recommended_array: any = [];
  pop_array: any = [];
  popular_array: any = [];
  closed = false;
  items: any = [];
  myList: any = [];
  items_myList: any = [];
  public text: string = 'Add to Watchlist';
  public success: boolean = false;
  public danger: boolean = false;
  public mobile_check: boolean = true;

  constructor(private activatedRoute:ActivatedRoute, private http: HttpClient, private modalService: NgbModal, private router:Router, private breakpointObserver: BreakpointObserver) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.media_type=this.activatedRoute.snapshot.paramMap.get('media_type');
    this.fetchData();
    this.mobileCheck();
  }
  //mobile view function
  mobileCheck():any{
    this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mobile_check = false;
          console.log(this.mobile_check);
        } else {
          this.mobile_check = true;
          console.log(this.mobile_check);
        }
      });
  }



  //function to close alert
  clickClose():any{
    this.success = false;
    this.danger = false;
  }

  //Add movies to Mylist function
  addToList(poster_path, title, media_type, id):any{
    var flag = false;
    this.items_myList = localStorage.getItem("myList");

    if (JSON.parse(this.items_myList)){
      this.items_myList = JSON.parse(this.items_myList);
      for(var i = 0 ; i < this.items_myList.length ; i++){
        if (id == this.items_myList[i].id){
          this.text = 'Add from Watchlist'
          this.items_myList.splice(i,1);
          flag = true;
          this.danger = true;
          this.success = false;
          break;
        }
      }
      if(!flag){
        this.text = 'Remove from Watchlist'
        this.success = true;
        this.danger = false;
        var items_dict = {};
        items_dict['poster_path'] = poster_path;
        items_dict['title'] = title;
        items_dict['media_type'] = media_type;
        items_dict['id'] = id;
        this.items_myList.unshift(items_dict);
      }
      localStorage.setItem("myList", JSON.stringify((this.items_myList))); //{"myList":[]}
    }
    else{
      this.text = 'Remove from Watchlist'
      this.success = true;
      this.danger = false;
      var items_dict = {};
      items_dict['poster_path'] = poster_path;
      items_dict['title'] = title;
      items_dict['media_type'] = media_type;
      items_dict['id'] = id;
      localStorage.setItem("myList", JSON.stringify([items_dict]));
    }
    setTimeout(() => this.clickClose(), 5000);
}

  //Check the status of button on loading watch page
  check_storage(id): any{
    this.items_myList = localStorage.getItem("myList");
    this.items_myList = JSON.parse(this.items_myList);
    if(this.items_myList){
      for(var i = 0 ; i < this.items_myList.length ; i++){
        if (id == this.items_myList[i].id){
          this.text = 'Remove from Watchlist';
          return;
          }
      }
      this.text = 'Add to Watchlist';
    }
  }

  //Continue watching function
  addList(poster_path, title, media_type, id): any{
    // localStorage.clear();

    this.items = localStorage.getItem("itemsList");


    if (!JSON.parse(this.items)){
      var list_dict = {};
      list_dict['poster_path'] = poster_path;
      list_dict['title'] = title;
      list_dict['media_type'] = media_type;
      list_dict['id'] = id;
      localStorage.setItem("itemsList", JSON.stringify([list_dict]));
    }
    else{
      this.items = localStorage.getItem("itemsList");
      this.items = JSON.parse(this.items);
      for(var i = 0 ; i < this.items.length ; i++){
        if (id == this.items[i].id){
          this.items.splice(i,1);
          break;
        }
      }

      var list_dict = {};
      list_dict['poster_path'] = poster_path;
      list_dict['title'] = title;
      list_dict['media_type'] = media_type;
      list_dict['id'] = id;
      this.items.unshift(list_dict);
      this.items = localStorage.setItem("itemsList", JSON.stringify((this.items)));
      // console.log(localStorage.getItem("itemsList"));
    }
  }

  //Modal function
  openLg(content:any, cast_id:any){
    this.http.get<any>('http://localhost:8080/cast?id='+cast_id)
        .subscribe(data => {
          this.cast_details = data.cast_details_data[0][0];
          this.cast_externals = data.cast_external_ids_data[0][0];
          // console.log(this.cast_details);
    });
    this.modalService.open(content, { size: 'lg' });
  }

  //Recommended movies check empty
  recmd(): any{
    if (this.recommended_array.length == 0){
      return false;
    }
    else{
      return true;
    }
  }

  //similar movies check empty
  smlr(): any{

    if (this.similar_array.length == 0){
      return false;
    }
    else{
      return true;
    }
  }
  fetchData(): any{
    this.http.get<any>(
      "http://localhost:8080/watch?media_type=" + this.media_type + "&id=" +  this.id)
      .subscribe(responseData => {
              this.incoming_data = responseData;

              this.video = this.incoming_data.video_data[0][0];
              this.details = this.incoming_data.details_data[0][0];
              this.addList(this.details.poster_path, this.details.original_title, this.media_type, this.id);
              this.check_storage(this.id);
              this.cast = this.incoming_data.cast_data[0];
              this.reviews = this.incoming_data.reviews_data[0];
              this.reviewslength = this.incoming_data.reviews_data[0].length;
              this.recommended = this.incoming_data.recommended_data;
              this.similar = this.incoming_data.similar_data;

              for (var i = 0; i < this.recommended.length; i++){
                if (i%6 == 0 && i>0){
                  this.recommended_array.push(this.popular_array);
                  this.popular_array = [];
                  this.popular_array.push(this.recommended[i]);
                }
                else{
                  this.popular_array.push(this.recommended[i]);
                }
              }
              if (this.popular_array.length != 0){
                this.recommended_array.push(this.popular_array);
              }


              for (var i = 0; i < this.similar.length; i++){
                if (i%6 == 0 && i>0){
                  this.similar_array.push(this.pop_array);
                  this.pop_array = [];
                  this.pop_array.push(this.similar[i]);
                }
                else{
                  this.pop_array.push(this.similar[i]);
                }
              }
              if (this.pop_array.length != 0){
                this.similar_array.push(this.pop_array);
              }



    });

}



}
