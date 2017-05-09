import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { QuestionsPage } from '../../pages';

@Component({
    selector: 'page-new-question',
    templateUrl: './new-question.html'
})

export class NewQuestionPage{

    question_name:string = "";
    cat_id:any;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public navParams:NavParams
    ){}

    ionViewDidLoad():void{
        this.cat_id = this.navParams.data.id;
        console.log(this.cat_id);
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }

    save():void{
        // Send data back to calling page
        let data = {name: this.question_name, cat_id: this.cat_id, description: '', created: '', modified: '', answered:false, implemented:'', comments:'', improvements:false, imgSrc:'', field_id_5:''};
        
        this.viewCtrl.dismiss(data);
    }


}