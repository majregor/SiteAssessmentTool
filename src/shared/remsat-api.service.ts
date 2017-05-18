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

    public round(number, precision):number {
        let factor = Math.pow(10, precision);
        let tempNumber = number * factor;
        let roundedTempNumber = Math.round(tempNumber);
        
        return roundedTempNumber / factor;
    }

    public calculateFileSize(size:number):number{
        return (size>=Math.pow(1000,3)) ? this.round(size/Math.pow(1000,3),2) : ( (size>=Math.pow(1000,2)) ?  this.round(size/Math.pow(1000,2), 2) : ( (size>=100) ? this.round(size/Math.pow(1000,1),2) : size) );
    }

    public unitizeFileSize(size:number):string{
        let x = this.calculateFileSize(size);
        return (size>=Math.pow(1000,3)) ? x.toString() + " GB" : ( (size>=Math.pow(1000,2)) ?  x.toString() + " MB" : ( (size>=100) ? x.toString() + " KB" : x.toString() + " B") );
    }
    
}

