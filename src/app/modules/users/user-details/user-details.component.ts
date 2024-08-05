import { Component, OnInit } from '@angular/core';
import { header } from './constants';
import { IHeader } from '../../../core/interfaces/Data/header.interface';
import { HelpersService } from '../../../core/services/helpers/helpers.service';
import { StatesService } from '../../../core/services/states/states.service';
import { DataService } from '../../../core/services/data/data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss', '../../dashboard/dashboard.component.scss']
})
export class UserDetailsComponent implements OnInit {
  viewuserHeader:IHeader = header
  user!:any
  constructor(
    private helpers:HelpersService,
    private states:StatesService,
    private data:DataService
  ){}

ngOnInit(): void {
  this.user = this.data.getBody()
}
  navigate(page: string, dir: string) {
    this.helpers.navigate(page, dir);
    this.states.setActiveRoute(page);
  }
}
