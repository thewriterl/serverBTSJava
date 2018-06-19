import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../../shared';
import {
    FilmsService,
    FilmsPopupService,
    FilmsComponent,
    FilmsDetailComponent,
    FilmsDialogComponent,
    FilmsPopupComponent,
    FilmsDeletePopupComponent,
    FilmsDeleteDialogComponent,
    filmsRoute,
    filmsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...filmsRoute,
    ...filmsPopupRoute,
];

@NgModule({
    imports: [
        MyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FilmsComponent,
        FilmsDetailComponent,
        FilmsDialogComponent,
        FilmsDeleteDialogComponent,
        FilmsPopupComponent,
        FilmsDeletePopupComponent,
    ],
    entryComponents: [
        FilmsComponent,
        FilmsDialogComponent,
        FilmsPopupComponent,
        FilmsDeleteDialogComponent,
        FilmsDeletePopupComponent,
    ],
    providers: [
        FilmsService,
        FilmsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppFilmsModule {}
