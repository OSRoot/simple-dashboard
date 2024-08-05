import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { EmptyViewComponent } from './empty-view/empty-view.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    PreloaderComponent,
    EmptyViewComponent,
    ErrorViewComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports:[
    PreloaderComponent,
    EmptyViewComponent,
    ErrorViewComponent
  ]
})
export class SharedModule { }
