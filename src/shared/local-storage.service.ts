import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Question, DefaultData } from '../model/model';



@Injectable()

export class LocalStorage {
  
  databaseInitialized:boolean = false;

  constructor(private storage: Storage) {}

  initStorage():void{
      let data:DefaultData = new DefaultData();
      this.storage.ready().then(() => {

       // set a key/value
       this.storage.set('categories', data.get('categories'));
       this.storage.set('questions', data.get('questions'));
       this.databaseInitialized = true;

       // Or to get a key/value pair
       /*
       this.storage.get('questions').then((val) => {
        
         for(let l of val){
             console.log(l.name);
         }
       })
       */

     });
  }

  getTopics():Promise<any>{

       return this.storage.get('categories');
  }

  getQuestions():Promise<any>{
      return this.storage.get('questions');
  }

  addQuestion(question:any):Promise<any>{

      let originalQuestions:any[] = [];
      let maxId:number = 1;

      return this.getQuestions()
        .then((data)=>{
            originalQuestions = data;
            for(let q of originalQuestions){
                maxId = (q.id>maxId) ? q.id : maxId;
            }
            question.id = (++maxId);
            originalQuestions.push(question);

            return this.storage.set('questions', originalQuestions);
        })
        .catch((err)=>{
            console.log(err)
            });
  }

  editQuestion(question:Question):Promise<any>{
    
      return this.getQuestions()
      .then((data)=>{

          for(let q of <Question[]>data){
              if(q.id == question.id){
                  let index = data.indexOf(q);
                  if(index !== -1){
                      data[index] = question;
                  }
                  break;
              }
          }
          return this.storage.set('questions', data);
      })
      .catch((err)=>{
          console.log(err);
      });
  }


}