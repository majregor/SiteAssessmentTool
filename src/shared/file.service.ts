import { Injectable } from '@angular/core';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File, Entry, FileEntry, DirectoryEntry } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { RemsatApi } from './shared';

import * as JSZip from 'jszip';


declare var cordova:any;

@Injectable()

export class FileService{

    jsZip:any;
    public static IMAGES_FOLDER:string = "photos";
    public static LOCAL_PATH:string = cordova.file.dataDirectory;

    constructor(
        private appService:RemsatApi,
        private file: File, 
        public filePath: FilePath,
        private transfer: Transfer
    ){
        this.jsZip = new JSZip();
    }


    // Copy the image to a local folder
    public copyFileToLocalDir(path:string, fileName:string, newpath:string, newFileName:string):Promise<any> {
      return this.file.copyFile(path, fileName, newpath, newFileName);
    }


    public listFiles(directory:string='.'):Promise<FileEntry[]>{
      
      return this.file.listDir(cordova.file.dataDirectory, directory);

    }

    // Create a new name for the file 
    public createRandomFileName(extension:string=".jpg"):string {
      var d = new Date(),
      n = d.getTime(),
      newFileName =  n + extension;
      return newFileName;
    }

    public initDir(dirName:string):Promise<boolean>{
        
        return new Promise<boolean>((resolve, reject)=>{

            this.file.checkDir(FileService.LOCAL_PATH, dirName).then((success)=>{
                resolve(true);
            }).catch((err)=>{
                this.file.createDir(FileService.LOCAL_PATH, dirName, true).then((dirEntry)=>{
                    resolve(true);
                    }).catch((err)=>{
                        reject(err);
                    });
            });
        });
    }

    /**
     * Returns the actual absolute path to the file
     * @param _file File Name
     * @param _type The type of file image or file
     */
    public getAbsolutePath(_file:string, _type="file"):string {
        if (_file === null) {
            return '';
        } else {
            switch(_type){
                case "file":
                    return FileService.LOCAL_PATH + _file;
                case "image":
                    return this.getPhotosDirPath() +  _file;
            }
        }
    }

    public getPhotosDirPath():string{
        return FileService.LOCAL_PATH + FileService.IMAGES_FOLDER + "/";
    }

    // Get the size of the fileEntry
    public getFileSize(_file:FileEntry):Promise<string>{
      return new Promise<string>((resolve, reject)=>{
        
        _file.file(
          (fileObject)=>{ 
                resolve(this.appService.unitizeFileSize(fileObject.size));
          }, 
          (err)=>{ 
                reject(err);
          });
      });
      
    }

    public addSQLToArchive(data:string):void{
        this.jsZip.file("bkup.sql", data);
    }

    public readSQLFromArchive():Promise<string>{

        return this.jsZip.file("bkup.sql").async("string");
    }


}