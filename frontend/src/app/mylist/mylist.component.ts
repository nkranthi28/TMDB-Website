import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {

  display_list: any = [];
  public mobile_check: boolean = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.obtain_data();
    this.isMobile();
  }

  obtain_data():any{
    this.display_list = localStorage.getItem("myList");
    this.display_list = JSON.parse(this.display_list);
    // console.log(this.display_list);
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

}
