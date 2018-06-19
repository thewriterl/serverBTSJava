import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../../shared';
import {
    ProductionCompanyService,
    ProductionCompanyPopupService,
    ProductionCompanyComponent,
    ProductionCompanyDetailComponent,
    ProductionCompanyDialogComponent,
    ProductionCompanyPopupComponent,
    ProductionCompanyDeletePopupComponent,
    ProductionCompanyDeleteDialogComponent,
    productionCompanyRoute,
    productionCompanyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...productionCompanyRoute,
    ...productionCompanyPopupRoute,
];

@NgModule({
    imports: [
        MyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProductionCompanyComponent,
        ProductionCompanyDetailComponent,
        ProductionCompanyDialogComponent,
        ProductionCompanyDeleteDialogComponent,
        ProductionCompanyPopupComponent,
        ProductionCompanyDeletePopupComponent,
    ],
    entryComponents: [
        ProductionCompanyComponent,
        ProductionCompanyDialogComponent,
        ProductionCompanyPopupComponent,
        ProductionCompanyDeleteDialogComponent,
        ProductionCompanyDeletePopupComponent,
    ],
    providers: [
        ProductionCompanyService,
        ProductionCompanyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppProductionCompanyModule {}
