import { Component } from '@angular/core';
import { Router,Event,NavigationStart,NavigationEnd,NavigationError,NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation} from './app.animation';
import {MessageService} from './messages/message.service'

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading =true;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
/* below property added as this.messageService.isDiaplyed can be access to the template only in the development
 it wont in the production build. because the 'private messageService:MessageService' 
 is private only accesible only wihtin the class, wrap the content in the getter */
  get isMessageDisplayed():boolean{
    return this.messageService.isDisplayed;
  }
  constructor(private authService: AuthService,private router:Router,private messageService:MessageService) { 
    router.events.subscribe((routerEvent:Event)=> {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages():void{
    this.messageService.isDisplayed=true;
    this.router.navigate([{outlets:{popup:['messages']}}]);    
  }

  hideMessages():void{
    this.messageService.isDisplayed=false;
    /* this.router.navigateByUrl('/login') */
    this.router.navigate([{outlets:{popup:null}}]);    
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
