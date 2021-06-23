import { OnInit } from '@angular/core';
import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  code:string = '';
  model: any;
  public mobile_check: boolean = true;
  isNavbarCollapsed=true;
  constructor(private router: Router, private httpclient: HttpClient, private breakpointObserver: BreakpointObserver) {}


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


  search: OperatorFunction<any, readonly any[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term =>
      this.search_movie(term).pipe()));

  search_movie(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.httpclient
      .get<[any, string[]]>('http://localhost:8080/search?term='+ term).pipe(
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
  }

  formatter = (x: {name: string}) => x.name;

  searchFn($event:any){
    console.log($event);
    const media_type = $event.item.media_type;
    const id = $event.item.id;
    this.router.navigate(['/watch', media_type,id]);
  }

}
