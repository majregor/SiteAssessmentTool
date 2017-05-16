import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { SQLStorage, RemsatApi, Loader } from '../../../shared/shared';
import { Question } from '../../../model/model';

import * as moment from 'moment';

declare var cordova:any;

@Component({
  selector: 'page-question',
  templateUrl: './question.html'
})
export class QuestionPage {

  question:Question=new Question();
  //imgSrc:string;
  lastImage: string = null;
  imgs = new Array();
  savedImgs = new Array();

  constructor(
              private platform:Platform,
              public navCtrl: NavController, 
              public navParams:NavParams,
              public viewCtrl:ViewController,
              public actionSheetCtrl: ActionSheetController,
              public sqlStorage:SQLStorage,
              private camera:Camera,
              private file: File, 
              private filePath: FilePath,
              private appService:RemsatApi,
              private loadingCtr:Loader) {

  }


  ionViewDidLoad():void{
    this.question = <Question>this.navParams.data;
    if(this.question.imgSrc && (typeof this.question.imgSrc === 'string')){
      //alert(this.question.imgSrc);
      let savedImgs = this.question.imgSrc.split(',');
      for(let savedImg of savedImgs){
        let captionText:string="";
        if(this.question.imgCaptions && this.question.imgCaptions.length>0){
          for(let imgCaption of this.question.imgCaptions){
            if(imgCaption.img == savedImg){
              captionText = imgCaption.text;
              break;
            }
          }
        }
        
        this.savedImgs.push({name:<string>savedImg, path:this.pathForImage(savedImg), caption:captionText, editing:false});
      }
    }
  }

  dismiss(){
    
    this.viewCtrl.dismiss();
  }

  save():void{
    
    let loader = this.loadingCtr.createLoader('Saving...', 'dots', false);
    let imgSrc:string="";
    loader.present().then(()=>{

        if(this.imgs.length>0){

          for(let i=0; i<this.imgs.length; i++){
            let sep:string=" ";
            this.question.imgCaptions.push({img:this.imgs[i].name, text:this.imgs[i].caption});
            this.copyFileToLocalDir(this.imgs[i].correctPath, this.imgs[i].currentName, this.imgs[i].name, this.imgs[i].caption);
            if(i<(this.imgs.length-1)){
              sep=",";
            }
            imgSrc +=this.imgs[i].name +sep;
          }
        }

        
        if(this.imgs.length>0 && this.savedImgs.length>0){ //Images exist and more have been added
          //imgSrc+= ","+ this.savedImgs.toString();
          for(let i=0; i<this.savedImgs.length;i++){
            imgSrc += ","+this.savedImgs[i].name;
          }
        }else if(this.imgs.length<=0 && this.savedImgs.length>0){ //Images exist but no more have been added
          
          imgSrc = this.question.imgSrc;
        }
        this.question.answered = true;
        this.question.modified = moment().toISOString();
        this.question.imgSrc = imgSrc.trim();
        loader.dismiss();
        this.viewCtrl.dismiss(this.question);
    });
    
  }

  doCapturePhoto():void{
    let actionSheet = this.actionSheetCtrl.create({

      title: 'Select Photo Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: ()=>{
            this.capturePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: ()=>{
            this.capturePhoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role:'cancel'
        }
      ]
    });
    
    actionSheet.present();
  }


  capturePhoto(sourceType):void{

      let options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      /*targetHeight: 500,
      targetWidth: 500,*/
      saveToPhotoAlbum: false
    };

    //get the image data
    this.camera.getPicture(options)
        .then((imageUri) => { 

            // Special image handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imageUri)
                    .then((filePath)=>{
                      let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                      let currentName = imageUri.substring(imageUri.lastIndexOf('/') + 1, imageUri.lastIndexOf('?'));
                      this.imgs.push({name: this.createFileName(), correctPath: correctPath, currentName: currentName, tempUri:imageUri, caption:'', editing:false});
                      //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            }else{

                var currentName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
                var correctPath = imageUri.substr(0, imageUri.lastIndexOf('/') + 1);
                this.imgs.push({name: this.createFileName(), correctPath: correctPath, currentName: currentName, tempUri:imageUri, caption:'', editing:false});
                //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
          
            //this.imgSrc = imageUri; 
        })
        .catch((err)=>{
          alert(err);
        });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName, caption='') {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
        .then((success) => {

            this.sqlStorage.addCaption(newFileName, caption).then(()=>{
              this.lastImage = newFileName;
            })
            .catch((err)=>{
              this.appService.presentToast(err.message);
            })
            
          })
          .catch((error) => {
              this.appService.presentToast('Error while storing file.');
          });
  }

  // Gets the accurate path to the apps folder
  public pathForImage(img):string {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  // Toggle image editing mode
  private toggleImageMode(img:any){
    img.editing = !img.editing;
  }

  // Do Save for already existing images.
  private doSaveCaption(img:any){
    img.editing = !img.editing;

    let loader = this.loadingCtr.createLoader('Saving...', 'dots', false);
    loader.present().then(()=>{
    this.sqlStorage.editCaption(img).then(()=>{
              for(let _imgCaption of this.question.imgCaptions){
                if(_imgCaption.img == img.name){
                  _imgCaption.text = img.caption;
                }
              }
              //dissmiss loader
              loader.dismiss();
            })
            .catch((err)=>{
              this.appService.presentToast(err.message);
            })
    });
  }

}
