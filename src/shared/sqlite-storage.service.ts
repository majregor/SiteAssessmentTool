import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()

export class SQLStorage{

    initStorage():void{

        let categoriesSQL:string = "CREATE TABLE IF NOT EXISTS categories ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `parent` INTEGER, `name` TEXT NOT NULL, `title` TEXT NOT NULL, `description` TEXT )";
        
        let sqlite:SQLite = new SQLite();
        sqlite.create({
            name: 'remsat.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
                db.executeSql(categoriesSQL, {})
                .then(() => alert('Executed SQL'))
                .catch(e => alert(e));
            })
            .catch(e => alert(e)); 
        }
}