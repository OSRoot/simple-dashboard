import { Component } from '@angular/core';
import { HelpersService } from '../../../core/services/helpers/helpers.service';
import { StatesService } from '../../../core/services/states/states.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IHeader } from '../../../core/interfaces/Data/header.interface';
import { header } from './constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss', '../../dashboard/dashboard.component.scss']
})
export class AddUserComponent {
  adduserHeader:IHeader = header
  form!:FormGroup

  constructor(
    private helpers:HelpersService,
    private states:StatesService,
    private fb:FormBuilder
  ){
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      name:[''],
      email:[''],
      password:['']
    })
  }

  navigate(page: string, dir: string) {
    this.helpers.navigate(page, dir);
    this.states.setActiveRoute(page);
  }
}
