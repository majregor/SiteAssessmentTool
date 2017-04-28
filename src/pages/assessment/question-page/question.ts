import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-question',
  templateUrl: './question.html'
})
export class QuestionPage {

  question:any = {};

  implemented:string = "na";
  comments:string="";
  constructor(
              public navCtrl: NavController, 
              public navParams:NavParams,
              public viewCtrl:ViewController) {

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

}
