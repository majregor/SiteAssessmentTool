import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SQLStorage, LocalStorage, Loader } from '../../../shared/shared';

//Import Pages
import { QuestionPage, QuestionsPage } from '../../pages';

@Component({
  selector: 'page-subtopic',
  templateUrl: './subtopic.html'
})
export class SubtopicPage {

  topic:any = {};
  subTopics:any[] = [];

  constructor(public navCtrl: NavController, private loadingCtrl:Loader, public navParams: NavParams, public localStorage:LocalStorage, public sqlStorage:SQLStorage) {

  }

  isChild(element, index, array) { 
      return (element.parent == this ); 
  }

  getSubTopicQuestions(value, index, array){
    let _questions:any = this;
    value.questions = _questions.filter(function(element, index, array){ return (element.cat_id == this); }, value.id);
    value.hasQuestions = (value.questions.length>0) ? true : false;
    value.assessmentComplete = (value.hasQuestions) ? checkCompletion(value.questions) : false;

      function checkCompletion(q:any[]):boolean{
      let complete:boolean = true;
      for(let i of q){
        if(!i.answered){
          complete = false;
          break;
        }
      }
      return complete;
    }
  }

  ionViewWillEnter(){
    
    this.subTopics.map((value, index, array)=>{
      if(value.hasQuestions){
        this.sqlStorage.checkCompletion(value.id).then((data)=>{
          value.assessmentComplete = <boolean>data;
        }).catch((err)=>{alert(err)});

      }
    }, this);
    /*for(let subTopic of this.subTopics){
      if(subTopic.hasQuestions){
        let complete:boolean = true;
        for(let qu of subTopic.questions){
          if(!qu.answered){
            complete = false;
            break;
          }
        }

        if(complete){
            let index = this.subTopics.indexOf(subTopic);
            this.subTopics[index].assessmentComplete = (index !== -1) ? true : false ;
        }

      }
    }*/

    
  }
   
  ionViewDidLoad(){
    this.topic = this.navParams.data;

    let loader = this.loadingCtrl.createLoader('Loading...','circles',false);

    loader.present().then(()=>{

      /*this.localStorage.getTopics().then( (val) => {
        this.localStorage.getQuestions().then( (v) => { 
          this.questions = v; 
          this.subTopics = val.filter( this.isChild, this.topic.id );
          this.subTopics.map(this.getSubTopicQuestions, this.questions);
          loader.dismiss();
        });
      });*/

      this.subTopics = this.sqlStorage.getCategories(this.topic.id, true);

      loader.dismiss();
      
    });
  }

  subTopicClicked(subtopic:any):void{
    
    if(subtopic.hasQuestions){
      this.navCtrl.push(QuestionsPage, subtopic);
    }
    
  }
}
