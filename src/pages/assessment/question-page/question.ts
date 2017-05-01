import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-question',
  templateUrl: './question.html'
})
export class QuestionPage {

  question:any = {};

  implemented:string = "na";
  comments:string="";
  improvements:boolean = false;
  imgSrc:any;

  constructor(
              public navCtrl: NavController, 
              public navParams:NavParams,
              public viewCtrl:ViewController,
              private camera:Camera) {

  }

  ionViewDidLoad():void{
    this.question = this.navParams.data;
  }

  dismiss(){
    
    this.viewCtrl.dismiss();
  }

  save():void{
    let data = {'foo':'bar'};
    this.viewCtrl.dismiss(data);
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
