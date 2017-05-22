import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { SQLStorage, RemsatApi, Loader } from '../../../shared/shared';
import { FileService } from '../../../shared/shared';
import { Question } from '../../../model/model';

import { ToolsPage, SharingPage } from '../../pages';

declare var cordova:any;

@Component({
  selector: 'page-gallery',
  templateUrl: './gallery.html'
})

export class GalleryPage{

}