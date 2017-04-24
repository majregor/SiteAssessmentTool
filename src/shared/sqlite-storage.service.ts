import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()

export class SQLStorage{


    initStorage():void{

        let sqlite = new SQLite();
        sqlite.create({
            name: 'data.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
                db.executeSql('create table danceMoves(name VARCHAR(32))', {})
                .then(() => console.log('Executed SQL'))
                .catch(e => console.log(e));
            })
            .catch(e => console.log(e)); 
        }
}