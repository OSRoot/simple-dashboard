
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../core/interfaces/others/user.interface';
import { DataService } from '../../../core/services/data/data.service';
import { IHeader } from '../../../core/interfaces/Data/header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() headerContent!: IHeader
  user!: IUser
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  canShowSearchAsOverlay = false;
  disableSearch: boolean = false;
  selectedLanguage: any;
  active_link = '';
  constructor(
    public actRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private data: DataService
  ) { }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

getActiveLink() {
  return this.router.url.split('/').pop();
}
  //////////////////////////// listen to scroll to hide/show header /////////////////////////
  isHeaderHidden = false;
  private lastScrollTop = 0;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    this.isHeaderHidden = st > this.lastScrollTop && st > 50;
    this.lastScrollTop = st <= 0 ? 0 : st;
  }
////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit():void {
    this.active_link = this.getActiveLink() as string;

    this.getUser();
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.disableSearch = event.url.includes('add');
    });
  }
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768) {
      styleClass = 'head-md-screen';
    }
    return styleClass
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true
    }
    else {
      this.canShowSearchAsOverlay = false
    }
  }

  selectLang(lang: any) {
    this.selectedLanguage = lang;
  };
navigate(page:string, dir:string){
    this.router.navigate([page])
}

  getUser(){
    // this.data.getData('/user/profile').subscribe(
    //   res=>{
    //     this.user = res[0];
    //   },
    //   err=>{

    //   }
    // )
  }

  logout() {
    this.authService.logOut();
  }
}
