import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileEntry } from '@ionic-native/file';

import { FileService } from '../../../shared/shared';

@Component({
    selector: 'page-tools',
    templateUrl: 'tools.html'
})

export class ToolsPage{

    constructor(
        private navCtrl: NavController,
        private fileService:FileService){}

    files:Array<FileEntry> = [];
    fileSizes:Array<string> =[];

    ionViewDidLoad():void{

        this.fileService.listFiles().then((_files)=>{
            if(_files && _files.length>0){
                for(let _file of _files){
                    if(_file.isFile){
                        this.fileService.getFileSize(_file).then((size)=>{
                            this.fileSizes.push(size);
                        })
                        .catch((err)=>{
                            alert(err);
                        });
                        this.files.push(_file);
                    }
                }
            }
        })
        .catch((err)=>{
            alert(err.message);
        })
    }

    doClick():void{

    }
}

class FileSizes{
    key:string
}