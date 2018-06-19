import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../../shared';
import {
    DirectorService,
    DirectorPopupService,
    DirectorComponent,
    DirectorDetailComponent,
    DirectorDialogComponent,
    DirectorPopupComponent,
    DirectorDeletePopupComponent,
    DirectorDeleteDialogComponent,
    directorRoute,
    directorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...directorRoute,
    ...directorPopupRoute,
];

@NgModule({
    imports: [
        MyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DirectorComponent,
        DirectorDetailComponent,
        DirectorDialogComponent,
        DirectorDeleteDialogComponent,
        DirectorPopupComponent,
        DirectorDeletePopupComponent,
    ],
    entryComponents: [
        DirectorComponent,
        DirectorDialogComponent,
        DirectorPopupComponent,
        DirectorDeleteDialogComponent,
        DirectorDeletePopupComponent,
    ],
    providers: [
        DirectorService,
        DirectorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppDirectorModule {}
