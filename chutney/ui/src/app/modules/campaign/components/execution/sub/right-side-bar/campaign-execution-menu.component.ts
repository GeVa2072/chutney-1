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

import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { combineLatest, Observable, of, tap, identity, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FileSaverService } from 'ngx-filesaver';

import * as JSZip from 'jszip';

import { CampaignService, EnvironmentService, JiraPluginService, LoginService, ScenarioService } from '@core/services';
import { Authorization, Campaign, ScenarioIndex, TestCase } from '@model';
import { EventManagerService } from '@shared';
import { MenuItem } from '@shared/components/layout/menuItem';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'chutney-campaign-execution-menu',
    templateUrl: './campaign-execution-menu.component.html',
    styleUrls: ['./campaign-execution-menu.component.scss']
})
export class CampaignExecutionMenuComponent implements OnInit {

    @Input() campaign: Campaign;
    rightMenuItems: MenuItem[] = [];

    private environments: Array<string> = [];
    private modalRef: BsModalRef;

    @ViewChild('delete_modal') deleteModal: TemplateRef<any>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private campaignService: CampaignService,
        private scenarioService: ScenarioService,
        private environmentService: EnvironmentService,
        private fileSaverService: FileSaverService,
        private jiraLinkService: JiraPluginService,
        private loginService: LoginService,
        private modalService: BsModalService,
        private eventManagerService: EventManagerService) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap(() => this.environments$())
        ).subscribe(environments => {
            this.environments = environments;
            this.initRightMenu();
        });
    }

    private environments$(): Observable<string[]> {
        if (this.loginService.hasAuthorization(Authorization.CAMPAIGN_EXECUTE)) {
            return this.environmentService.names();
        }
        return of([]);
    }

    private executeCampaign(envName: string) {
        this.broadcastCatchError(this.campaignService.executeCampaign(this.campaign.id, envName)).subscribe();
        timer(1000).pipe(
            switchMap(() => of(this.eventManagerService.broadcast({ name: 'execute', env: envName })))
        ).subscribe();
    }

    private deleteCampaign() {
        combineLatest([
            this.broadcastCatchError(this.campaignService.delete(this.campaign.id)),
            this.broadcastCatchError(this.jiraLinkService.removeForCampaign(this.campaign.id))
        ]).subscribe(() => this.router.navigateByUrl('/campaign'));
    }

    private exportCampaign() {
        combineLatest([
            this.broadcastCatchError(this.campaignService.find(this.campaign.id)),
            this.broadcastCatchError(this.campaignService.findAllScenarios(this.campaign.id))
        ]).subscribe(([campaign, scenarios]) => this.createZip(campaign.title, scenarios));
    }

    private createZip(campaignTitle: string, scenarios: ScenarioIndex[]) {
        const $rawTestCases: Array<Observable<TestCase>> = [];

        for (const testCase of scenarios) {
            $rawTestCases.push(this.scenarioService.findRawTestCase(testCase.id));
        }

        combineLatest($rawTestCases).subscribe(rawTestCases => {
            const zip = new JSZip();
            rawTestCases.forEach(testCase => {
                const fileName = `${testCase.id}-${testCase.title}.chutney.hjson`;
                zip.file(fileName, testCase.content);
            });

            zip.generateAsync({ type: 'blob' })
                .then(blob => this.fileSaverService.save(blob, campaignTitle));
        });
    }

    private openDeleteModal() {
        this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    }

    confirmDelete(): void {
        this.modalRef.hide();
        this.deleteCampaign();
    }

    declineDelete(): void {
        this.modalRef.hide();
    }

    private initRightMenu() {
        const emptyCampaign = this.hasCampaignWithoutScenarios();
        this.rightMenuItems = [
            {
                label: emptyCampaign ? 'campaigns.execution.error.empty' : 'global.actions.execute',
                click: this.executeCampaign.bind(this),
                iconClass: 'fa fa-play',
                authorizations: [Authorization.CAMPAIGN_EXECUTE],
                options: this.environments.map(env => {
                    return { id: env, label: env };
                }),
                disabled: emptyCampaign
            },
            {
                label: 'global.actions.edit',
                link: `/campaign/${this.campaign.id}/edition`,
                iconClass: 'fa fa-pencil-alt',
                authorizations: [Authorization.CAMPAIGN_WRITE]
            },
            {
                label: 'global.actions.delete',
                click: this.openDeleteModal.bind(this),
                iconClass: 'fa fa-trash',
                authorizations: [Authorization.CAMPAIGN_WRITE]
            },
            {
                label: 'global.actions.export',
                click: this.exportCampaign.bind(this),
                iconClass: 'fa fa-file-code',
                authorizations: [Authorization.CAMPAIGN_WRITE]
            }
        ];
    }

    private broadcastError(errorMessage: string) {
        this.eventManagerService.broadcast({ name: 'error', msg: errorMessage });
    }

    private broadcastCatchError(obs: Observable<any>, errorHandler: (error: any) => string = identity): Observable<any> {
        return obs.pipe(
            catchError((err: HttpErrorResponse) => {
                this.broadcastError(errorHandler(err.error));
                throw err;
            })
        );
    }

    private hasCampaignWithoutScenarios(): boolean {
        return this.campaign.scenarios.length == 0;
    }
}
