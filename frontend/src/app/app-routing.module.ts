import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { WatchComponent } from './watch/watch.component';
import { MylistComponent } from './mylist/mylist.component'; 

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'watch/:media_type/:id', component:WatchComponent},
  {path: 'mylist', component: MylistComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
