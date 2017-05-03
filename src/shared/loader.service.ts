import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()

export class Loader{
    
    constructor(private loadingController:LoadingController){}

    createLoader(text:string='Loading...', type:string='circles', hideOnPageChange:boolean=true):Loading{

        return this.loadingController.create(
            {
            content: text,
            dismissOnPageChange: hideOnPageChange,
            spinner: type //spinner: 'dots'ios 	'ios-small' 	'bubbles' 	'circles' 	'crescent' 	'dots' 
          }
        );
    }

}