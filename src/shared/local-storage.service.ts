import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()

export class LocalStorage {

  constructor(private storage: Storage) {}

  initStorage():void{
      let data:JSONData = new JSONData();

      this.storage.ready().then(() => {

       // set a key/value
       this.storage.set('categories', data.data('categories'));
       this.storage.set('questions', data.data('questions'));

       // Or to get a key/value pair
       this.storage.get('questions').then((val) => {
         //console.log('Your age is', val);
         for(let l of val){
             console.log(l.name);
         }
       })
     });
  }

}



class JSONData{

    data(table:string){

        let ret:any[];
        switch(table){
            case 'categories':
                ret= [
                    {id:16, parent:'My name', name:'Last Name', title:'', description:''}, 
                    {id:15, parent:'My name', name:'Last Namexx', title:'', description:''},
                    {id:1, parent:0, name:'Characteristics and Surroundings',	title:'Characteristics and Surroundings',	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:2, parent:0, name:'Facility Exterior',	                title:'Facility Exterior',          	    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:3, parent:0, name:'Facility Interior',	                title:'Facility Interior',	                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:4, parent:0, name:'Security Policies, Procedures and ',	title:'Security Policies, Procedures and ',	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:5, parent:0, name:'Policy COnsiderations',	            title:'Policy Considerations',	            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:6, parent:2, name:'Fencing and Walls',	                title:'Fencing and Walls',	                description: ''},
                    {id:7, parent:2, name:'Gates',	                            title:'Gates',	                            description: ''},
                    {id:8, parent:2, name:'Lighting',	                        title:'Lighting',	                        description: ''},
                    {id:9, parent:2, name:'Building and Grounds',	            title:'Building and Grounds',               description: ''},
                    {id:10,parent:2	,name:'Landscaping',	                    title:'Landscaping',	                    description: ''},
                    {id:11,parent:2	,name:'Transportation Areas',	            title:'Transportation Areas',	            description: ''},
                    {id:12,parent:1	,name:'Staff Parking Areas',	            title:'Staff Parking Areas',	            description: ''},
                    {id:13,parent:11,name:'Visitor Parking Areas',	            title:'Visitor Parking Areas',	            description: ''},
                    {id:14,parent:11,name:'Student Parking',	                title:'Student Parking',	                description: ''}
                ];
            break;

            case 'questions':
            ret = [
                    { id:1, name: 'Question 1', cat_id: 6, description: '', created: '', modified: '', geometry: ''},
                    { id:2, name: 'Question 2', cat_id: 6, description: '', created: '', modified: '', geometry: ''},
                    { id:3, name: 'Question 3', cat_id: 6, description: '', created: '', modified: '', geometry: ''},
                    { id:4, name: 'Question 4', cat_id: 6, description: '', created: '', modified: '', geometry: ''},
                    { id:5, name: 'Question 5', cat_id: 6, description: '', created: '', modified: '', geometry: ''}
                ];
            case 'field_data':
        }

        return ret;
    }
}