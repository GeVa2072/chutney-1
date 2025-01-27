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

import { Routes } from '@angular/router';

import { Authorization } from '@model';
import { TargetsComponent } from '@modules/target/list/targets.component';
import { TargetComponent } from '@modules/target/details/target.component';
import { targetsResolver } from '@modules/target/resolver/targets-resolver.service';
import { environmentsNamesResolver } from '@core/services/environments-names.resolver';

export const targetsRoutes: Routes = [
    {
        path: '',
        component: TargetsComponent,
        data: { 'authorizations': [ Authorization.ENVIRONMENT_ACCESS ] }
    },
    {
        path: ':name',
        title: 'target details',
        component: TargetComponent,
        resolve: {targets: targetsResolver, environmentsNames: environmentsNamesResolver},
        data: { 'authorizations': [ Authorization.ADMIN_ACCESS ] }
    }
];
