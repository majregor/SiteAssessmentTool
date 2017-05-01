import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

/** Import Pages */
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { 
          AssessmentPage, QuestionPage, QuestionsPage, SubtopicPage, TopicPage,
          ImprovementPage, ImprovementSubtopicPage, ImprovementTopicPage,
          AboutPage, CrimePreventionPage, IntroPage, UDPage, ToolsPage } from '../pages/pages';

/** Import Shared APIs */
import { RemsatApi, SQLStorage, LocalStorage } from '../shared/shared';


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
    SubtopicPage, 
    TopicPage,
    ImprovementPage, 
    ImprovementSubtopicPage, 
    ImprovementTopicPage,
    AboutPage, 
    CrimePreventionPage, 
    IntroPage, 
    UDPage,
    ToolsPage
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
    SubtopicPage, 
    TopicPage,
    ImprovementPage, 
    ImprovementSubtopicPage, 
    ImprovementTopicPage,
    AboutPage, 
    CrimePreventionPage, 
    IntroPage, 
    UDPage,
    ToolsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemsatApi,
    SQLStorage,
    LocalStorage,
    Camera
  ]
})
export class AppModule {}
