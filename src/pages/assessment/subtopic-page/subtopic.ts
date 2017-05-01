import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

import { SQLStorage, LocalStorage } from '../../../shared/shared';

//Import Pages
import { 
          QuestionPage, QuestionsPage, AssessmentPage, TopicPage,
          ImprovementPage, ImprovementSubtopicPage, ImprovementTopicPage,
          AboutPage, CrimePreventionPage, IntroPage, UDPage, ToolsPage } from '../../pages';

@Component({
  selector: 'page-subtopic',
  templateUrl: './subtopic.html'
})
export class SubtopicPage {

  topic:any = {};
  subTopics:any[] = [];
  questions:any[] = [];
  hasQuestions:boolean = false;
  assessmentComplete:boolean = false;

  constructor(public navCtrl: NavController, private loadingCtrl:LoadingController, public navParams: NavParams, public localStorage:LocalStorage) {

  }

  isChild(element, index, array) { 
      return (element.parent == this ); 
  }

  getSubTopicQuestions(value, index, array){
    let _questions:any = this;
    value.questions = _questions.filter(function(element, index, array){ return (element.cat_id == this); }, value.id);
    value.hasQuestions = (value.questions.length>0) ? true : false;
    value.assessmentComplete = false;
  }
   
  ionViewDidLoad(){
    this.topic = this.navParams.data;

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      dismissOnPageChange: false
       //spinner: 'dots'ios 	'ios-small' 	'bubbles' 	'circles' 	'crescent' 	'dots' 
    });

    loader.present().then(()=>{

      this.localStorage.getTopics().then( (val) => {
        this.localStorage.getQuestions().then( (v) => { 
          this.questions = v; 
          this.subTopics = val.filter( this.isChild, this.topic.id );
          this.subTopics.map(this.getSubTopicQuestions, this.questions);
          loader.dismiss();
        });
      });
      
    });

    


  }

  subTopicClicked(subtopic:any):void{
    
    if(subtopic.hasQuestions){
      this.navCtrl.push(QuestionsPage, subtopic);
    }
    
  }
}
