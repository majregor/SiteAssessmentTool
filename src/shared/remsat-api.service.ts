import { Injectable } from '@angular/core';
import { Http /*, Response*/ } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class RemsatApi{
    
    appConfig:any = {
        'environment': 'development'
    };
    constructor(private http:Http){}
}