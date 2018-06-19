import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../../shared';
import {
    GenresService,
    GenresPopupService,
    GenresComponent,
    GenresDetailComponent,
    GenresDialogComponent,
    GenresPopupComponent,
    GenresDeletePopupComponent,
    GenresDeleteDialogComponent,
    genresRoute,
    genresPopupRoute,
} from './';

const ENTITY_STATES = [
    ...genresRoute,
    ...genresPopupRoute,
];

@NgModule({
    imports: [
        MyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GenresComponent,
        GenresDetailComponent,
        GenresDialogComponent,
        GenresDeleteDialogComponent,
        GenresPopupComponent,
        GenresDeletePopupComponent,
    ],
    entryComponents: [
        GenresComponent,
        GenresDialogComponent,
        GenresPopupComponent,
        GenresDeleteDialogComponent,
        GenresDeletePopupComponent,
    ],
    providers: [
        GenresService,
        GenresPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppGenresModule {}
