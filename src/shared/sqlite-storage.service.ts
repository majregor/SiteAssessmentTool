import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Question, DefaultData,level } from '../model/model';


@Injectable()

export class SQLStorage{

    initStorage():void{

        let batchCreateSQL = [
                                    "CREATE TABLE IF NOT EXISTS categories ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `parent` INTEGER, `name` TEXT NOT NULL, `title` TEXT NOT NULL, `description` TEXT )",
                                    "CREATE TABLE IF NOT EXISTS questions  ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `cat_id` INTEGER NOT NULL, `description` TEXT, `created` TEXT, `modified` TEXT, `answered` INTEGER, `implemented` TEXT, `comments` TEXT, `improvements` INTEGER, `imgSrc` TEXT )",
                                    "CREATE TABLE IF NOT EXISTS settings ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `key` TEXT NOT NULL, `value` TEXT NOT NULL )"
                                ];
        
        let sqlite:SQLite = new SQLite();
        sqlite.create({
            name: 'remsat.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
                db.sqlBatch(batchCreateSQL)
                .then(() => {

                    db.executeSql('SELECT * FROM settings', [])
                    .then((data)=>{
                        if(data && data.rows.length>0){
                            alert(data.rows.item(0).key);
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
                            alert(batchStatement.length + " records added to db");
                        })
                        .catch((err)=>{
                            alert(err)
                        });
            /** Populate Categories Table */

        }

        getCategories(parent:number=level.MAIN):Array<any>{

            let sqlite:SQLite = new SQLite();
            let categories:Array<any> = [];

            sqlite.create({
                name: 'remsat.db',
                location: 'default'
            })
            .then((db:SQLiteObject)=>{
                db.executeSql("SELECT * FROM categories WHERE parent = " + parent, [])
                                .then((data)=>{
                                    if(data && data.rows.length > 0){
                                        for(let d = 0; d<data.rows.length; d++){
                                            categories.push( data.rows.item(d));
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
}