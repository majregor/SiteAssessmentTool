import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage:LocalStorage) {

  }

  isChild(element, index, array) { 
      return (element.parent == this ); 
  }
   
  ionViewDidLoad(){
    this.topic = this.navParams.data;

    this.localStorage.getTopics().then( (val) => {
      this.subTopics = val.filter( this.isChild, this.topic.id )
    });
  }

  subTopicClicked(subtopic:any):void{
    this.navCtrl.push(QuestionsPage, subtopic);
  }

}
