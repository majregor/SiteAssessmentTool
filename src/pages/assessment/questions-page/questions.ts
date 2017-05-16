import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SQLStorage, Loader } from '../../../shared/shared';

//Import Pages
import { QuestionPage, NewQuestionPage } from '../../pages';

import { Question } from '../../../model/model';

@Component({
  selector: 'page-questions',
  templateUrl: './questions.html'
})
export class QuestionsPage {

  subTopic:any = {};
  questions:Question[] = [];

  constructor(
                public navCtrl: NavController, 
                public navParams:NavParams, 
                public sqlStorage:SQLStorage,
                public modalCtrl: ModalController,
                public loadingCtr:Loader) {
                }

  isChildQuestion(element, index, array){
    return (element.cat_id == this);
  }

  ionViewDidLoad(){
    this.subTopic = this.navParams.data;

    this.questions = this.sqlStorage.getQuestions(this.subTopic.id);
    

    /*this.localStorage.getQuestions().then( (val) => { 
      this.questions = val.filter(this.isChildQuestion, this.subTopic.id);
      console.log(this.questions);
    });*/

  }

  questionClicked(question:Question):void{
    //this.navCtrl.push(QuestionPage, question);
    let modalPage = this.modalCtrl.create(QuestionPage, question);
    modalPage.onDidDismiss( data => {
      if(data){

        let loader = this.loadingCtr.createLoader('Saving...', 'dots', false);
        
        loader.present().then(()=>{
          
          this.sqlStorage.updateQuestion(question)
            .then((res)=>{
              loader.dismiss();
            })
            .catch((err)=>{
              alert(err);
            });
          /*this.localStorage.editQuestion(data).then((val)=>{

            this.localStorage.getQuestions().then( (val) => { 
              this.questions = val.filter(this.isChildQuestion, this.subTopic.id);
              loader.dismiss();
            });

          });*/
          
        });
      }
    });
    modalPage.present();
  }

  doAddClicked():void{
    let modalNewQuestion = this.modalCtrl.create(NewQuestionPage, this.subTopic);
    
    
    modalNewQuestion.onDidDismiss(data=>{
      if(data){
        //Attempt to save to Local Storage

        let loader = this.loadingCtr.createLoader('Saving...', 'dots', false);

        
        loader.present().then(()=>{
          /*this.localStorage.addQuestion(data).then((val)=>{
          
            this.localStorage.getQuestions().then( (val) => { 
              this.questions = val.filter(this.isChildQuestion, this.subTopic.id);
              loader.dismiss();
            });

          });*/

          this.sqlStorage.addQuestion(data)
              .then(()=>{
                this.questions = this.sqlStorage.getQuestions(this.subTopic.id);
                loader.dismiss();
              })
              .catch((err)=>{
                alert(err);
              })
        });
      }
    });

    modalNewQuestion.present();
  }

}
