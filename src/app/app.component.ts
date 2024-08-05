import { Component, OnInit } from '@angular/core';
import { TranslationService } from './core/services/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'simple-dashboard';
  constructor(
    private translation:TranslationService
  ){}
  ngOnInit(){
    this.translation.initTranslate();
  }
}
