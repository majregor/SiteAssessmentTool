import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public loadingCtr:LoadingController, public storage: SQLStorage, public localStorage: LocalStorage) {}

  topics:any[];

  topicClicked(topic:any):void{
    //this.navCtrl.push(TopicPage);
    //alert(topic.name);
    this.navCtrl.push(SubtopicPage, topic);
  }

   private isMainTopic(element, index, array) { 
    return (element.parent==0); 
  } 

  ionViewDidLoad():void{

    let loader = this.loadingCtr.create({
      content: "Loading...",
      dismissOnPageChange: true
      //spinner: 'dots'ios 	'ios-small' 	'bubbles' 	'circles' 	'crescent' 	'dots' 
    });
    //this.storage.initStorage();

    loader.present().then(()=>{

      this.localStorage.initStorage();

      this.localStorage.getTopics().then( 
        (val) => { 
          this.topics = val.filter(this.isMainTopic);
        });

        loader.dismiss();

    });    
}


}