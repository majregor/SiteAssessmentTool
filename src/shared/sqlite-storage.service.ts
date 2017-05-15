import { Injectable } from '@angular/core';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Question, DefaultData, Level } from '../model/model';


@Injectable()

export class SQLStorage{


    initStorage():Promise<any>{

        let batchCreateSQL = [
                                    "CREATE TABLE IF NOT EXISTS categories ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `parent` INTEGER, `name` TEXT NOT NULL, `title` TEXT NOT NULL, `description` TEXT )",
                                    "CREATE TABLE IF NOT EXISTS questions  ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `cat_id` INTEGER NOT NULL, `description` TEXT, `created` TEXT, `modified` TEXT, `answered` INTEGER, `implemented` TEXT, `comments` TEXT, `improvements` INTEGER, `imgSrc` TEXT )",
                                    "CREATE TABLE IF NOT EXISTS settings ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `key` TEXT NOT NULL, `value` TEXT NOT NULL )"
                                ];
        
        let sqlite:SQLite = new SQLite();
        return sqlite.create({
            name: 'remsat.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
                db.sqlBatch(batchCreateSQL)
                .then(() => {

                    db.executeSql('SELECT * FROM settings', [])
                    .then((data)=>{
                        if(data && data.rows.length>0){
                            //alert(data.rows.item(0).key);
                        }else{
                            this.populateDB(db);
                        }
                        
                    })
                    .catch((error)=>{
                        alert(error);
                    })
                })
                .catch(e => alert(e));
            })
            .catch(e => alert(e)); 
        }



        populateDB(db:SQLiteObject):void{

            let defaultData:DefaultData = new DefaultData();
            let defaultCategories = defaultData.get('categories');
            let defaultQuestions = defaultData.get('questions');
            let batchStatement:Array<string> = [];

            // Default Categories
            for(let category of defaultCategories){
                batchStatement.push("INSERT INTO categories (id, parent, name, title, description) VALUES ("+category.id+", "+category.parent+", '"+category.name+"', '"+category.title+"', '"+category.description+"')");
            }

            // Default Questions
            for(let question of defaultQuestions){

                question.answered = (question.answered) ? 1 : 0;
                question.improvements = (question.improvements) ? 1 : 0;
                batchStatement.push("INSERT INTO questions (id, name, cat_id, description, answered, implemented, comments, improvements) VALUES ("+question.id+", '"+question.name+"', "+question.cat_id+", '"+question.description+"', "+question.answered+", '"+question.implemented+"', '"+question.comments+"', "+question.improvements+")");
            }

            // Settings
            batchStatement.push("INSERT INTO settings (key, value) VALUES('installed', 1)");

            db.sqlBatch(batchStatement)
                        .then(()=>{
                            //alert(batchStatement.length + " records added to db");
                        })
                        .catch((err)=>{
                            alert(err)
                        });

        }

        getCategories(parent:number=Level.MAIN, checkCompletion=false):Array<any>{

            let sqlite:SQLite = new SQLite();
            let categories:Array<any> = [];

            sqlite.create({
                name: 'remsat.db',
                location: 'default'
            })
            .then((db:SQLiteObject)=>{
                db.executeSql("SELECT A.*, B.hasQuestions FROM categories A LEFT JOIN (SELECT cat_id, count(id) AS hasQuestions FROM questions GROUP By cat_id) B ON A.id = B.cat_id WHERE A.parent = " + parent, [])
                                .then((data)=>{
                                    if(data && data.rows.length > 0){
                                        for(let d = 0; d<data.rows.length; d++){
                                            if(checkCompletion){
                                                this.checkCompletion(data.rows.item(d).id).then((ret)=>{
                                                    data.rows.item(d).assessmentComplete = ret;
                                                    categories.push(data.rows.item(d));
                                                })
                                            }else{
                                                categories.push(data.rows.item(d));
                                            }
                                            
                                        }
                                    }
                                })
                                .catch((err)=>{
                                    alert(err);
                                })
            })
            .catch((err)=>{

            })

            return categories;
        }


        getQuestions(category:number = 0):Array<Question>{

            let sqlite:SQLite = new SQLite();
            let questions:Array<any> = [];

            sqlite.create({
                name: 'remsat.db',
                location: 'default'
            })
            .then((db:SQLiteObject)=>{
                let query = (category == 0 ) ? "SELECT * FROM questions" : ("SELECT * FROM questions WHERE cat_id = " + category);
                db.executeSql(query, [])
                                .then((data)=>{
                                    if(data && data.rows.length > 0){
                                        for(let d = 0; d<data.rows.length; d++){
                                            questions.push(data.rows.item(d));
                                        }
                                    }
                                })
                                .catch((err)=>{
                                    alert(err);
                                })
            })
            .catch((err)=>{

            })

            return questions;
        }

        updateQuestion(question:Question):Promise<any>{

            let sqlite:SQLite = new SQLite();
            
            return sqlite.create({
                name: 'remsat.db',
                location: 'default'
            })
            .then((db:SQLiteObject)=>{
                let answered = (question.answered) ? 1 : 0;
                let improvements = (question.improvements) ? 1 : 0;
                let query = "UPDATE questions SET modified='"+ question.modified +"', answered="+ answered +", implemented='"+ question.implemented  +"', comments='"+ question.comments +"', improvements="+ improvements +", imgSrc='"+ question.imgSrc +"' WHERE id = " + question.id;
                return db.executeSql(query, []);
            })
            .catch((err)=> {
                alert(err);
            })
        }

        addQuestion(data:any):Promise<any>{

            let sqlite:SQLite = new SQLite();
            
            return sqlite.create({
                name: 'remsat.db',
                location: 'default'
            })
            .then((db:SQLiteObject)=>{
                let query = "INSERT INTO questions (name, cat_id, description, answered, implemented, comments, improvements) VALUES ('"+data.name+"', "+data.cat_id+", '', 0, '', '', 0)";
                return db.executeSql(query, []);
            })
            .catch((err)=> {
                alert(err);
            })
        }

        removeQuestion(question:Question):Promise<any>{

            let sqlite:SQLite = new SQLite();

            return sqlite.create({
                name: 'remsat.db',
                location: 'default'
            })
            .then((db:SQLiteObject)=>{
                let query:string = "DELETE FROM questions WHERE id = " + question.id;
                return db.executeSql(query, []);
            })
            .catch((err)=>{
                alert(err);
            })
        }

        checkCompletion(id:number):Promise<boolean>{
            let sqlite:SQLite = new SQLite();
            let ret:boolean = true;
            
            return new Promise((resolve, reject)=>{
                    sqlite.create({
                    name: 'remsat.db',
                    location: 'default'
                })
                .then((db:SQLiteObject)=>{
                    let query = "SELECT cat_id, answered  FROM questions WHERE cat_id = " + id;
                    db.executeSql(query, []).then((data)=>{
                        if(data && data.rows.length>0){
                            for(let i=0;i<data.rows.length; i++){
                                if(data.rows.item(i).answered!=1){
                                    ret = false;
                                    break;
                                }
                            }
                        }else{
                            ret = false;
                        }

                        resolve(ret);
                    })
                    .catch((err)=>{
                        reject(err);
                    })
                })
                .catch((err)=> {
                    reject(err);
                })
            });
        }
}