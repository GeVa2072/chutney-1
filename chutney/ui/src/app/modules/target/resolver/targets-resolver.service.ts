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

import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { Target, TargetFilter } from '@model';
import { inject } from '@angular/core';
import { EnvironmentService } from '@core/services';

export const targetsResolver: ResolveFn<Target[]> =
    (route: ActivatedRouteSnapshot) => {
        const name = route.params['name'];
        return name === 'new' ? of([]) : inject(EnvironmentService).getTargets(new TargetFilter(name, null));

    };
