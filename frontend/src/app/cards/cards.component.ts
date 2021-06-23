import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BreakpointObserver, Breakpoints, BreakpointState, LayoutModule } from '@angular/cdk/layout';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  popular: any =[];
  popular_tv: any =[];
  popular_array: any =[];
  final_array: any = [];
  top_rated: any = [];
  top_rated_array: any =[];
  final_top_rated_array: any = [];
  trending: any = [];
  trending_array: any =[];
  final_trending_array: any = [];
  popular_tv_array: any = [];
  final_popular_tv_array: any = [];
  trending_tv: any = [];
  trending_tv_array: any =[];
  final_trending_tv_array: any = [];
  watch: any = [];
  watch_array: any = [];
  watch_final_array: any = [];
  top_rated_tv: any = [];
  top_rated_tv_array: any =[];
  final_top_rated_tv_array: any = [];
  public mobile_check: boolean = true;

  constructor(private http:HttpClient, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.popularData();
    this.watching();
    this.isMobile();
  }

  isMobile():any{
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

  watching(): any{
    this.watch = localStorage.getItem("itemsList");
    this.watch = JSON.parse(this.watch);
    console.log(this.watch);
    for (var i = 0; i < this.watch.length; i++){
      if (i%6 == 0 && i>0){
        this.watch_final_array.push(this.watch_array);
        this.watch_array = [];
        this.watch_array.push(this.watch[i]);
      }
      else{
        this.watch_array.push(this.watch[i]);
      }
    }
    this.watch_final_array.push(this.watch_array);
    // console.log(this.watch_final_array);
  }

  popularData(): any{
    this.http.get<any>('http://localhost:8080/main')
      .subscribe(data => {
        this.popular = data.popular_data;
        this.top_rated = data.top_rated_data;
        this.trending = data.trending_data;
        this.popular_tv = data.popular_tv_data;
        this.trending_tv = data.trending_tv_data;
        this.top_rated_tv = data.top_rated_tv_data;

        for (var i = 0; i < this.popular.length; i++){
          if (i%6 == 0 && i>0){
            this.final_array.push(this.popular_array);
            this.popular_array = [];
            this.popular_array.push(this.popular[i]);
          }
          else{
            this.popular_array.push(this.popular[i]);
          }
        }
      this.final_array.push(this.popular_array);

        //top_rated movie cards carousel
        for (var i = 0; i < this.top_rated.length; i++){
          if (i%6 == 0 && i>0){
            this.final_top_rated_array.push(this.top_rated_array);
            this.top_rated_array = [];
            this.top_rated_array.push(this.top_rated[i]);
          }
          else{
            this.top_rated_array.push(this.top_rated[i]);
          }
        }
        this.final_top_rated_array.push(this.top_rated_array);

        //trending movie cards carousel
        for (var i = 0; i < this.trending.length; i++){
          if (i%6 == 0 && i>0){
            this.final_trending_array.push(this.trending_array);
            this.trending_array = [];
            this.trending_array.push(this.trending[i]);
          }
          else{
            this.trending_array.push(this.trending[i]);
          }
        }
        this.final_trending_array.push(this.trending_array);

        //popular TV shows cards carousel
        for (var i = 0; i < this.popular_tv.length; i++){
          if (i%6 == 0 && i>0){
            this.final_popular_tv_array.push(this.popular_tv_array);
            this.popular_tv_array = [];
            this.popular_tv_array.push(this.popular_tv[i]);
          }
          else{
            this.popular_tv_array.push(this.popular_tv[i]);
          }
        }
        this.final_popular_tv_array.push(this.popular_tv_array);

        //Top rated tv cards carousel
        for (var i = 0; i < this.top_rated_tv.length; i++){
          if (i%6 == 0 && i>0){
            this.final_top_rated_tv_array.push(this.top_rated_tv_array);
            this.top_rated_tv_array = [];
            this.top_rated_tv_array.push(this.top_rated_tv[i]);
          }
          else{
            this.top_rated_tv_array.push(this.top_rated_tv[i]);
          }
        }
        this.final_top_rated_tv_array.push(this.top_rated_tv_array);
        

        //trending tv cards carousel
        for (var i = 0; i < this.trending_tv.length; i++){
          if (i%6 == 0 && i>0){
            this.final_trending_tv_array.push(this.trending_tv_array);
            this.trending_tv_array = [];
            this.trending_tv_array.push(this.trending_tv[i]);
          }
          else{
            this.trending_tv_array.push(this.trending_tv[i]);
          }
        }
        this.final_trending_tv_array.push(this.trending_tv_array);

      });



  }


}
