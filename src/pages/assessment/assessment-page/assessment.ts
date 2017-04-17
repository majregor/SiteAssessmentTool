import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-assessment',
  templateUrl: './assessment.html'
})
export class AssessmentPage {

  constructor(public navCtrl: NavController) {

  }

  topicClicked():void{
    alert("Topic is clicked");
  }

}