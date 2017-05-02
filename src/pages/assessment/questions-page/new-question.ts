import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { QuestionsPage } from '../../pages';

import { LocalStorage } from '../../../shared/shared';

@Component({
    selector: 'page-new-question',
    templateUrl: './new-question.html'
})

export class NewQuestionPage{

    question_name:string = "";

    constructor(
        public localStorage:LocalStorage,
        public viewCtrl: ViewController,
        public navParams:NavParams
    ){}

    ionViewDidLoad():void{

    }

    dismiss(){
        this.viewCtrl.dismiss();
    }

    save():void{
        // Send data back to calling page
        let data = { id:0, name: this.question_name, cat_id: 6, description: '', created: '', modified: '', answered:false, field_id_1:null, field_id_2:null, field_id_3:null, field_id_4:null, field_id_5:null};
        
        this.viewCtrl.dismiss(data);
    }


}