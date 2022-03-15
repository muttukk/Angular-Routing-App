import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';


const routes=[
      {path:'welcome',component:WelcomeComponent},
      {path:'', redirectTo:'welcome',pathMatch:'full'},
      {path:'**',component:PageNotFoundComponent}
];
@NgModule({
imports:[
    RouterModule.forRoot(routes) //,{enableTracing:true} to see the
],
exports:[RouterModule]
})

export class AppRoutingModule{ }