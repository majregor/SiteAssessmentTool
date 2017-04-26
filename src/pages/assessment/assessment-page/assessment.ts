import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Import Pages
import { 
          QuestionPage, QuestionsPage, SubtopicPage, TopicPage,
          ImprovementPage, ImprovementSubtopicPage, ImprovementTopicPage,
          AboutPage, CrimePreventionPage, IntroPage, UDPage, ToolsPage } from '../../pages';
          
import { SQLStorage, LocalStorage } from '../../../shared/shared';

@Component({
  selector: 'page-assessment',
  templateUrl: './assessment.html'
})
export class AssessmentPage {

  constructor(public navCtrl: NavController, public storage: SQLStorage, public localStorage: LocalStorage) {}

  topics:any[];

  topicClicked():void{
    this.navCtrl.push(TopicPage);
  }

   private isBigEnough(element, index, array) { 
    return (element.parent==0); 
  } 

  ionViewDidLoad():void{
    console.log('Page Loaded');
    //this.storage.initStorage();
    //this.localStorate.initStorage();

    this.localStorage.getTopics().then( 
      (val) => { 
        this.topics = val.filter(this.isBigEnough);
      }
      );

  }

}