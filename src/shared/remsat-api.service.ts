import { Injectable } from '@angular/core';
import { Http /*, Response*/ } from '@angular/http';
import { ToastController } from 'ionic-angular';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class RemsatApi{

    constructor(
                private http:Http, 
                private toastCtrl:ToastController
                ){}


    appConfig:any = {
        'environment': 'development'
    };

    public presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        
        toast.present();
    }
    
}