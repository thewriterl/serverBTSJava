import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../../shared';
import {
    ProductionCountriesService,
    ProductionCountriesPopupService,
    ProductionCountriesComponent,
    ProductionCountriesDetailComponent,
    ProductionCountriesDialogComponent,
    ProductionCountriesPopupComponent,
    ProductionCountriesDeletePopupComponent,
    ProductionCountriesDeleteDialogComponent,
    productionCountriesRoute,
    productionCountriesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productionCountriesRoute,
    ...productionCountriesPopupRoute,
];

@NgModule({
    imports: [
        MyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductionCountriesComponent,
        ProductionCountriesDetailComponent,
        ProductionCountriesDialogComponent,
        ProductionCountriesDeleteDialogComponent,
        ProductionCountriesPopupComponent,
        ProductionCountriesDeletePopupComponent,
    ],
    entryComponents: [
        ProductionCountriesComponent,
        ProductionCountriesDialogComponent,
        ProductionCountriesPopupComponent,
        ProductionCountriesDeleteDialogComponent,
        ProductionCountriesDeletePopupComponent,
    ],
    providers: [
        ProductionCountriesService,
        ProductionCountriesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppProductionCountriesModule {}
