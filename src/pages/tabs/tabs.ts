import { Component } from '@angular/core';

import { HomePage }       from '../home/home';
import { AssessmentPage } from '../assessment/assessment-page/assessment';
import { ImprovementPage} from '../improvement/improvement-page/improvement';
import { ToolsPage }      from '../tools/tools-page/tools';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AssessmentPage;
  tab3Root = ImprovementPage;
  tab4Root = ToolsPage;

  constructor() {

  }
}