/**
 * Copyright 2017-2023 Enedis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DateFormatPipe, MomentModule } from 'ngx-moment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragulaModule } from 'ng2-dragula';

import { SharedModule } from '@shared/shared.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { CampaignRoute } from './campaign.routes';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CampaignSchedulingComponent } from './components/campaign-scheduling/campaign-scheduling.component';
import { CampaignEditionComponent } from './components/create-campaign/campaign-edition.component';
import { CampaignExecutionComponent } from './components/execution/detail/campaign-execution.component';
import {
    CampaignExecutionsHistoryComponent
} from './components/execution/history/campaign-executions-history.component';
import { CampaignExecutionsComponent } from './components/execution/history/list/campaign-executions.component';
import {
    CampaignExecutionMenuComponent
} from './components/execution/sub/right-side-bar/campaign-execution-menu.component';

const ROUTES = [
    ...CampaignRoute
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgbModule,
        MomentModule,
        TranslateModule,
        DragulaModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        MoleculesModule
    ],
    declarations: [
        CampaignListComponent,
        CampaignEditionComponent,
        CampaignExecutionsComponent,
        CampaignExecutionComponent,
        CampaignSchedulingComponent,
        CampaignExecutionsHistoryComponent,
        CampaignExecutionMenuComponent
    ],
    providers: [
        DateFormatPipe
    ]
})
export class CampaignModule {
}
