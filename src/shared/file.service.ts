import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File, Entry, FileEntry, DirectoryEntry } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { RemsatApi } from './shared';

import * as JSZip from 'jszip';


declare var cordova:any;

@Injectable()

export class FileService{

    constructor(
        private appService:RemsatApi,
        private file: File, 
        private filePath: FilePath,
        private transfer: Transfer
    ){}

    // Copy the image to a local folder
    public copyFileToLocalDir(path:string, fileName:string, newFileName:string):Promise<any> {
      return this.file.copyFile(path, fileName, cordova.file.dataDirectory, newFileName);
    }

    public listFiles(directory:string='.'):Promise<FileEntry[]>{
      
      return this.file.listDir(cordova.file.dataDirectory, directory);

    }

    // Create a new name for the image
    public createRandomFileName(extension:string=".jpg"):string {
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + extension;
      return newFileName;
    }

    // Gets the accurate path to the apps folder
    public getRealPath(_file):string {
        if (_file === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + _file;
        }
    }

    // Get the size of the fileEntry
    public getFileSize(_file:FileEntry):Promise<number>{
      return new Promise<number>((resolve, reject)=>{
        
        _file.file(
          (fileObject)=>{ 
                resolve(fileObject.size);
          }, 
          (err)=>{ 
                reject(err);
          });
      });
      
    }
}