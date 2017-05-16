export enum Level{
    MAIN, CHILD
}
export class DefaultData{

    get(table:string){

        let ret:any[];
        switch(table){
            case 'categories':
                ret= [
                    {id:1, parent:0, name:'Characteristics and Surroundings',	title:'Characteristics and Surroundings',	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:2, parent:0, name:'Facility Exterior',	                title:'Facility Exterior',          	    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:3, parent:0, name:'Facility Interior',	                title:'Facility Interior',	                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:4, parent:0, name:'Security Policies, Procedures and ',	title:'Security Policies, Procedures and ',	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:5, parent:0, name:'Policy COnsiderations',	            title:'Policy Considerations',	            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:6, parent:2, name:'Fencing and Walls',	                title:'Fencing and Walls',	                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:7, parent:2, name:'Gates',	                            title:'Gates',	                            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:8, parent:2, name:'Lighting',	                        title:'Lighting',	                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:9, parent:2, name:'Building and Grounds',	            title:'Building and Grounds',               description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:10,parent:2	,name:'Landscaping',	                    title:'Landscaping',	                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:11,parent:0	,name:'Transportation Areas',	            title:'Transportation Areas',	            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:12,parent:1	,name:'Staff Parking Areas',	            title:'Staff Parking Areas',	            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:13,parent:11,name:'Visitor Parking Areas',	            title:'Visitor Parking Areas',	            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
                    {id:14,parent:11,name:'Student Parking',	                title:'Student Parking',	                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
                ];
            break;

            case 'questions':
                ret = [
                        { id:1, name: 'Question 1', cat_id: 6, description: '', created: '', modified: '', answered:false,      implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:2, name: 'Question 2', cat_id: 6, description: '', created: '', modified: '', answered:false,      implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:3, name: 'Question 3', cat_id: 6, description: '', created: '', modified: '', answered:false,      implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:4, name: 'Question 4', cat_id: 6, description: '', created: '', modified: '', answered:false,      implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:5, name: 'Question 5', cat_id: 6, description: '', created: '', modified: '', answered:false,      implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:6, name: 'Question 1', cat_id: 7, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:7, name: 'Question 2', cat_id: 7, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:8, name: 'Question 3', cat_id: 7, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:9, name: 'Question 4', cat_id: 7, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:10, name: 'Question 5', cat_id: 7, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:11, name: 'Question 1', cat_id: 8, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:12, name: 'Question 2', cat_id: 8, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:13, name: 'Question 3', cat_id: 8, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:14, name: 'Question 4', cat_id: 8, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:15, name: 'Question 5', cat_id: 8, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:16, name: 'Question 1', cat_id: 9, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:17, name: 'Question 2', cat_id: 9, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:18, name: 'Question 3', cat_id: 9, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:19, name: 'Question 4', cat_id: 9, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:20, name: 'Question 5', cat_id: 9, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:21, name: 'Question 1', cat_id: 10, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:22, name: 'Question 2', cat_id: 10, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:23, name: 'Question 3', cat_id: 10, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:24, name: 'Question 4', cat_id: 10, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:25, name: 'Question 5', cat_id: 10, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:26, name: 'Question 1', cat_id: 11, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:27, name: 'Question 2', cat_id: 11, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:28, name: 'Question 3', cat_id: 11, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:29, name: 'Question 4', cat_id: 11, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''},
                        { id:30, name: 'Question 5', cat_id: 11, description: '', created: '', modified: '', answered:false,     implemented:'na', comments:'', improvements:false, imgSrc:'', field_id_5:''}
                    ];
                break;

            case 'captions':
                ret = [
                    ];
                break;

        }

        return ret;
    }
}