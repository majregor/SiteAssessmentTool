export class Question{
    id: number;
    name: string;
    cat_id: number;
    description: string;
    created: string;
    modified: string;
    answered: boolean;
    implemented:string;
    comments:string;
    improvements:boolean;
    imgSrc:string;
    field_id_5:string;
    imgCaptions: Array<any>;

    constructor(private _name=""){
        this.name= _name;
        this.implemented = 'na';
        this.answered = false;
    }
}