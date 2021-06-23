import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  carousel: any = [];
  items: any = [];
  public mobile_check: boolean = true;

  constructor(private http:HttpClient, private activatedRoute:ActivatedRoute,private breakpointObserver: BreakpointObserver) { }
  

  ngOnInit(): void {
    this.fetchData();
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

  fetchData(): any{
    this.http.get<any>('http://localhost:8080/main')
      .subscribe(data => {
        this.carousel = data.carousel_data;
        // console.log(this.carousel);
      });
  }


}
