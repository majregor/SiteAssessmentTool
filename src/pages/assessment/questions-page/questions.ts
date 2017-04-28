import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SQLStorage, LocalStorage } from '../../../shared/shared';

//Import Pages
import { QuestionPage } from '../../pages';

@Component({
  selector: 'page-questions',
  templateUrl: './questions.html'
})
export class QuestionsPage {

  subTopic:any = {};
  questions:any[] = [];

  constructor(
                public navCtrl: NavController, 
                public navParams:NavParams, 
                public localStorage:LocalStorage,
                public modalCtrl: ModalController) {  }

  isChildQuestion(element, index, array){
    return (element.cat_id == this);
  }
  ionViewDidLoad(){
    this.subTopic = this.navParams.data;

    this.questions = this.subTopic.questions;

    /*this.localStorage.getQuestions().then( (val) => { 
      this.questions = val.filter(this.isChildQuestion, this.subTopic.id);
      console.log(this.questions);
    });*/

  }

  questionClicked(question:any):void{
    //this.navCtrl.push(QuestionPage, question);
    let modalPage = this.modalCtrl.create(QuestionPage, question);
    modalPage.onDidDismiss( data => {
      (data) ? console.log(data): ()=>{};
    });
    modalPage.present();
  }

}
