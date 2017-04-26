import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLStorage, LocalStorage } from '../../../shared/shared';

@Component({
  selector: 'page-questions',
  templateUrl: './questions.html'
})
export class QuestionsPage {

  subTopic:any = {};
  questions:any[] = [];

  constructor(public navCtrl: NavController, public navParams:NavParams, public localStorage:LocalStorage) {  }

  isChildQuestion(element, index, array){
    return (element.cat_id == this);
  }
  ionViewDidLoad(){
    this.subTopic = this.navParams.data;

    this.localStorage.getQuestions().then( (val) => { 
      this.questions = val.filter(this.isChildQuestion, this.subTopic.id);
      console.log(this.questions);
    });

  }

  questionClicked(question:any):void{
    alert(question.name);
  }

}
