import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../core/interfaces/others/user.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Storage } from '@ionic/storage-angular';
interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  user!:IUser
  title = 'dashboard';
  isSideNavCollapsed = false;
  screenWidth=0;

  constructor(
    private storage:Storage,
    private router:Router,
    private authService:AuthService
  ){
    this.init()
  }
  async init(){
    await this.storage.create();
    // Enable check user to be handled by auth service
    // this.checkUser();
  }

  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
