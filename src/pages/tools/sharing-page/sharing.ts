import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

//import { Observable, Observer } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/from';

import { ProgressBarComponent } from '../../../components/components';

import { SQLStorage, RemsatApi, Loader, FileService } from '../../../shared/shared';
import { Question } from '../../../model/model';

import { GalleryPage, ToolsPage } from '../../pages';

declare var cordova:any;

@Component({
  selector: 'page-sharing',
  templateUrl: './sharing.html'
})

export class SharingPage{

         topics:any[];
         email:string;
         loadProgress:number = 0;
         selectedTopics:Array<any>;

         constructor(
                public appService: RemsatApi,
                public navCtrl: NavController, 
                public loadingCtr:Loader, 
                public storage: SQLStorage,
                public socialSharing: SocialSharing,
                public fileService: FileService) {}
                

        ionViewDidLoad():void{

                let loader = this.loadingCtr.createLoader('Loading...', 'circles', false);

                loader.present()
                .then(()=>{
                
                        this.topics = this.storage.getCategories();
                        loader.dismiss();
                })
                .catch((err)=>{
                        this.appService.presentToast(err.message);
                });    
        }

        doShare():void{

                let options:any = {
                        message: 'share this', // not supported on some apps (Facebook, Instagram)
                        subject: 'the subject', // fi. for email
                        files: ['', ''], // an array of filenames either locally or remotely
                        url: 'https://www.website.com/foo/#bar?a=b',
                        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
                };

                
                this.loadProgress = 0;
                //this.topics.filter((value, index, array)=>{ return value.selected })

                this.storage.createBkup.subscribe(

                        (value) => {
                                console.log(`value: ${value}`);
                                this.fileService.addSQLToArchive(value);
                        },
                        (e) => {console.log(`error: ${e}`)},
                        () => {
                                console.log('Complete');
                                console.log('Creating Archive');

                                this.fileService.readSQLFromArchive().then((data)=>{
                                        console.log(data);
                                })
                        }
                );
                
                
                /*this.socialSharing.shareWithOptions(options).then(() => {
                        this.appService.presentToast('Email Sent');
                }).catch((err) => {
                        this.appService.presentToast(err.message);
                });*/
                
        }

        doChange(e){
                //alert(e);
        }
}