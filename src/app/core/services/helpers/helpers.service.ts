import { Injectable } from '@angular/core';
import {
  ActionSheetController,
  ActionSheetOptions,
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  NavController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertData } from '../../interfaces/others/alertConfirmData';


@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private tostCtrl: ToastController,
    private actionSheet:ActionSheetController,
    private router:Router
  ) {}
    ///////////////////////////////////////////////////////////////////////////////////
    navigate(page: string, dir: string, path?: any) {
      if (dir === 'forward'.toLowerCase()) {
        this.navCtrl.navigateForward(page);
      } else if (dir === 'root'.toLowerCase()) {
        this.navCtrl.navigateRoot(page);
      } else {
        this.navCtrl.navigateBack(page);
      }
    }
    ///////////////////////////////////////////////////////////////////////////////////

    navBack() {
      this.navCtrl.pop();
    }
    ///////////////////////////////////////////////////////////////////////////////////
  async genericAlertConfirm(options: AlertOptions): Promise<AlertData> {
    const alert = await this.alertCtrl.create({
      header: options.header || 'تأكيد',
      message: options.message || 'هل أنت متأكد؟',
      buttons: options.buttons || [
        { text: 'إلغاء', role: 'cancel' },
        { text: 'نعم', role: 'confirm' },
      ],
      cssClass: options.cssClass || 'OS-CUSTOM-ALERT',
      mode:options.mode||'ios',
      inputs:options.inputs|| []
    });
    await alert.present();
    const data = await alert.onDidDismiss() as AlertData;
    return data
  }
  ///////////////////////////////////////////////////////////////////////////////////
  async presentGenericToaster(options: ToastOptions) {
    const toaster = await this.tostCtrl.create({
      header: options.header || 'إخطار',
      message: options.message || 'تم',
      cssClass: options.cssClass || 'OS-CUSTOM-TOASTER',
      duration: options.duration || 3000,
      icon:'notifications-outline',
      buttons:[
        {icon:'close',role:'cancel'}
      ],
      position:options.position||'top'
    });
    await toaster.present();
    const data = await toaster.onDidDismiss();
  }
  ///////////////////////////////////////////////////////////////////////////////////

  async startLoading(options: LoadingOptions) {
    console.log('loading init');
    const loading = await this.loadingCtrl.create({
      message: options.message || undefined,
      animated: options.animated || true,
      cssClass: options.cssClass || 'OS-CUSTOM-LOADING',
    });
    return loading.present();
  }

  ///////////////////////////////////////////////////////////////////////////////////
  async dismissLoading(){
    return this.loadingCtrl.dismiss();
  }
  ///////////////////////////////////////////////////////////////////////////////////
  async openGenericAtionSheet(options:ActionSheetOptions){
    const action = await this.actionSheet.create({
      header:options.header||'اختر',
      subHeader:options.subHeader||'',
      buttons:options.buttons||[
        {text:'اغلاق',role:'cancel'},
      ],
      mode:options.mode||'ios',
      cssClass:options.cssClass||'OS-CUSTOM-ACTION-SHEET'
    });
    await action.present();
    const data = await action.onDidDismiss();
    return data
  }
}
