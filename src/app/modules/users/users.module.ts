import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModule } from '../menu/menu.module';


@NgModule({
  declarations: [
    AddUserComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MenuModule,
    TranslateModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FormsModule
  ]
})
export class UsersModule { }
