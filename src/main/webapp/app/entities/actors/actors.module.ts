import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../../shared';
import {
    ActorsService,
    ActorsPopupService,
    ActorsComponent,
    ActorsDetailComponent,
    ActorsDialogComponent,
    ActorsPopupComponent,
    ActorsDeletePopupComponent,
    ActorsDeleteDialogComponent,
    actorsRoute,
    actorsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...actorsRoute,
    ...actorsPopupRoute,
];

@NgModule({
    imports: [
        MyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ActorsComponent,
        ActorsDetailComponent,
        ActorsDialogComponent,
        ActorsDeleteDialogComponent,
        ActorsPopupComponent,
        ActorsDeletePopupComponent,
    ],
    entryComponents: [
        ActorsComponent,
        ActorsDialogComponent,
        ActorsPopupComponent,
        ActorsDeleteDialogComponent,
        ActorsDeletePopupComponent,
    ],
    providers: [
        ActorsService,
        ActorsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppActorsModule {}
