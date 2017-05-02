import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { SQLStorage, LocalStorage } from '../../../shared/shared';

//Import Pages
import { QuestionPage, NewQuestionPage } from '../../pages';

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
                public modalCtrl: ModalController,
                public loadingCtr:LoadingController) {
                }

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
      (data) ? this.localStorage.addQuestion(data): ()=>{};
    });
    modalPage.present();
  }

  doAddClicked():void{
    let modalNewQuestion = this.modalCtrl.create(NewQuestionPage);

    modalNewQuestion.onDidDismiss(data=>{
      if(data){
        //Attempt to save to Local Storage

        let loader = this.loadingCtr.create(
          {
            content: "Saving...",
            dismissOnPageChange: false,
            spinner: 'dots'
          }
        );

        loader.present().then(()=>{
          this.localStorage.addQuestion(data).then((val)=>{
          
            this.localStorage.getQuestions().then( (val) => { 
              this.questions = val.filter(this.isChildQuestion, this.subTopic.id);
              loader.dismiss();
            });

          });
        });

      } 
    });

    modalNewQuestion.present();
  }

}
