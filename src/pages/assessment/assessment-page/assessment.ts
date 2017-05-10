import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Import Pages
import { 
          QuestionPage, QuestionsPage, SubtopicPage, TopicPage,
          ImprovementPage, ImprovementSubtopicPage, ImprovementTopicPage,
          AboutPage, CrimePreventionPage, IntroPage, UDPage, ToolsPage } from '../../pages';
          
import { RemsatApi, SQLStorage, LocalStorage, Loader } from '../../../shared/shared';

@Component({
  selector: 'page-assessment',
  templateUrl: './assessment.html'
})
export class AssessmentPage {

  constructor(public navCtrl: NavController, 
              public loadingCtr:Loader, 
              public storage: SQLStorage, 
              public localStorage: LocalStorage) {}

  topics:any[];

  topicClicked(topic:any):void{
    
    this.navCtrl.push(SubtopicPage, topic);
  }

   private isMainTopic(element, index, array) { 
    return (element.parent==0); 
  } 

  ionViewDidLoad():void{

    let loader = this.loadingCtr.createLoader('Loading...', 'circles', false);

    loader.present()
    .then(()=>{
      
      this.topics = this.storage.getCategories();


      /*if(!this.localStorage.databaseInitialized){
        this.localStorage.initStorage();
      }*/
      
/*      this.localStorage.getTopics().then( 
        (val) => { 
          this.topics = val.filter(this.isMainTopic);
        });*/



        loader.dismiss();

    })
    .catch((err)=>{
      //console.log('Error: '+ err);
    });    
}


}