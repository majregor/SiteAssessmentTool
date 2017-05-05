import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Question } from '../../../model/model';

import * as moment from 'moment';

@Component({
  selector: 'page-question',
  templateUrl: './question.html'
})
export class QuestionPage {

  question:Question=new Question();
  imgSrc:string;
    

  constructor(
              public navCtrl: NavController, 
              public navParams:NavParams,
              public viewCtrl:ViewController,
              private camera:Camera) {

  }


  ionViewDidLoad():void{
    this.question = <Question>this.navParams.data;
  }

  dismiss(){
    
    this.viewCtrl.dismiss();
  }

  save():void{
    
    this.question.answered = true;
    this.question.modified = moment().toISOString();
    this.viewCtrl.dismiss(this.question);
  }

  capturePhoto():void{

      let options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageUri) => { this.imgSrc = imageUri; });
  }

}
