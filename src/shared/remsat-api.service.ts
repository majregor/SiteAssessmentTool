import { Injectable } from '@angular/core';
import { Http /*, Response*/ } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class RemsatApi{

    constructor(
                private http:Http, 
                private toastCtrl:ToastController,
                private file: File
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

