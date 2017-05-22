import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

/** Import Pages */
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { 
          AssessmentPage, QuestionPage, QuestionsPage, NewQuestionPage, SubtopicPage,
          ImprovementPage, ImprovementSubtopicPage, ImprovementTopicPage,
          AboutPage, CrimePreventionPage, IntroPage, UDPage, ToolsPage, SharingPage, GalleryPage } from '../pages/pages';

/** Import Shared APIs and Services */
import { RemsatApi, SQLStorage, LocalStorage, Loader, FileService } from '../shared/shared';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    ContactPage,
    AssessmentPage,
    QuestionPage, 
    QuestionsPage, 
    NewQuestionPage,
    SubtopicPage, 
    ImprovementPage, 
    ImprovementSubtopicPage, 
    ImprovementTopicPage,
    AboutPage, 
    CrimePreventionPage, 
    IntroPage, 
    UDPage,
    ToolsPage,
    GalleryPage,
    SharingPage
  ], 
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
      name: 'remsat',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    ContactPage,
    AssessmentPage,
    QuestionPage, 
    QuestionsPage,
    NewQuestionPage,
    SubtopicPage, 
    ImprovementPage, 
    ImprovementSubtopicPage, 
    ImprovementTopicPage,
    AboutPage, 
    CrimePreventionPage, 
    IntroPage, 
    UDPage,
    ToolsPage,
    SharingPage,
    GalleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemsatApi,
    SQLStorage,
    LocalStorage,
    Loader,
    Camera,
    File,
    FilePath,
    Transfer,
    FileService,
    SocialSharing
  ]
})
export class AppModule {}
