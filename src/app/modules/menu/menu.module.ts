import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { SublevelMenuComponent } from './side-nav/sublevel-menu.component';
import { SidenavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { CdkMenuItemRadio, CdkMenuItemCheckbox, CdkMenuGroup, CdkMenu, CdkMenuTrigger, CdkMenuItem, CdkMenuBar } from '@angular/cdk/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BodyComponent,
    HeaderComponent,
    SublevelMenuComponent,
    SidenavComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    CdkMenuItemRadio,
    CdkMenuItemCheckbox,
    CdkMenuGroup,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItem,
    CdkMenuBar,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    BodyComponent,
    HeaderComponent,
    SublevelMenuComponent,
    SidenavComponent,
    MainComponent
  ]
})
export class MenuModule { }
