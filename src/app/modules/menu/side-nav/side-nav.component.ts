import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { INavbarData, fadeInOut, navbarData } from '../../../core/scripts/sidenav-data';
import { TranslationService } from '../../../core/services/translation/translation.service';
import { StatesService } from '../../../core/services/states/states.service';
import { Subscription } from 'rxjs';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations:[
    fadeInOut,
    trigger('rotate',[
      transition(':enter', [
        animate('1000ms',
        keyframes([
          style({transform:'rotate(0deg)',offset:'0'}),
          style({transform:'rotate(2turn)',offset:'1'}),
        ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
isUser():boolean{
  const token = this.authService.accessToken;
  if (!token) return false;
  return true
}
@Output() onToggleSideNav : EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed :boolean = false;
  screenWidth:number = 0
  navData = navbarData
  multiple:boolean=false;
  active_link:string='dashboard';
  $subscription:Subscription | undefined;
  selectedLanguage = 'ar';
  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({
        screenWidth:this.screenWidth,
        collapsed:this.collapsed
      })
    }
  }
  constructor(
    public router:Router,
    private authService:AuthService,
    private translate:TranslationService ,
    private statesService:StatesService
  ){}
  ngOnInit(): void {
    this.$subscription = this.statesService.activeRoute$.subscribe((route)=>{
      console.log(route);
      this.setActiveLink(route)
    })
    // i want to get the last path after the /
    this.active_link=this.router.url.split('/')[2];
    this.screenWidth = window.innerWidth;
  }

  setLanguage(language:string){
    this.selectedLanguage = language;
    this.translate.changeLang(language)
  }

  setActiveLink(link:string){
    this.active_link = link
  }



  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      screenWidth:this.screenWidth,
      collapsed:this.collapsed
    })
  };
  closeSidenav():void{
    this.collapsed = false;
    this.onToggleSideNav.emit({
      screenWidth:this.screenWidth,
      collapsed:this.collapsed
    })
  };

  handleClick(item:INavbarData):void{
    this.shrinkItems(item)
    item.expanded = !item.expanded;
  }

  getActiveClass(data:INavbarData):string{
    return this.router.url.includes(data.routeLink)?'active':'';
  }

  shrinkItems(item:INavbarData):void{
    console.log('item',item);

    if(!this.multiple){
      for(let modelItem of this.navData){
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }


}
