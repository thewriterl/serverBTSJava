import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../../shared';
import {
    SpokenLanguagesService,
    SpokenLanguagesPopupService,
    SpokenLanguagesComponent,
    SpokenLanguagesDetailComponent,
    SpokenLanguagesDialogComponent,
    SpokenLanguagesPopupComponent,
    SpokenLanguagesDeletePopupComponent,
    SpokenLanguagesDeleteDialogComponent,
    spokenLanguagesRoute,
    spokenLanguagesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...spokenLanguagesRoute,
    ...spokenLanguagesPopupRoute,
];

@NgModule({
    imports: [
        MyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SpokenLanguagesComponent,
        SpokenLanguagesDetailComponent,
        SpokenLanguagesDialogComponent,
        SpokenLanguagesDeleteDialogComponent,
        SpokenLanguagesPopupComponent,
        SpokenLanguagesDeletePopupComponent,
    ],
    entryComponents: [
        SpokenLanguagesComponent,
        SpokenLanguagesDialogComponent,
        SpokenLanguagesPopupComponent,
        SpokenLanguagesDeleteDialogComponent,
        SpokenLanguagesDeletePopupComponent,
    ],
    providers: [
        SpokenLanguagesService,
        SpokenLanguagesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppSpokenLanguagesModule {}
