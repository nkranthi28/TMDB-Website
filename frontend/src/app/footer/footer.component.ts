import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState, LayoutModule } from '@angular/cdk/layout';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public mobile_check: boolean = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
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

}
