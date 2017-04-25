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

  constructor(public navCtrl: NavController, public storage: SQLStorage, private localStorate: LocalStorage) {}

  topicClicked():void{
    this.navCtrl.push(TopicPage);
  }

  ionViewDidLoad():void{
    console.log('Page Loaded');
    //this.storage.initStorage();
    this.localStorate.initStorage();
  }

}