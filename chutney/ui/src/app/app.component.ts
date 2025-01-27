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

import { Component, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import * as moment from 'moment';

@Component({
    selector: 'chutney-main',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {


    constructor(private translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        // // the lang to use, if the lang isn't available, it will use the current loader to get them
        // // take only language designator, i.e. forget about region
        let lang = navigator.language.substring(0, 2) || translate.getDefaultLang();
        translate.use(lang);
        registerLocaleData(localeFr);
        this.updateMomentLocal(lang);
    }

    private updateMomentLocal(lang: string) {
        moment.updateLocale(lang, chutneyMomentCalendar[lang]);
    }
}

const chutneyMomentCalendar = {
    'en': {
        calendar: {
            sameDay: '[Today at] HH:mm',
            nextDay: '[Tomorrow at] HH:mm',
            nextWeek: 'dddd [at] HH:mm',
            lastDay: '[Yesterday at] HH:mm',
            lastWeek: '[Last] dddd [at] HH:mm',
            sameElse: 'L [at] HH:mm',
        }
    },
    'fr': {
        calendar: {
            sameDay: '[Aujourd’hui à] HH:mm',
            nextDay: '[Demain à] HH:mm',
            nextWeek: 'dddd [à] HH:mm',
            lastDay: '[Hier à] HH:mm',
            lastWeek: 'dddd [dernier à] HH:mm',
            sameElse: 'L [à] HH:mm',
        }
    }
};
