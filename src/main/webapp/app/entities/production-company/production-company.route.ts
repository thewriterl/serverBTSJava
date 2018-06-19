import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductionCompanyComponent } from './production-company.component';
import { ProductionCompanyDetailComponent } from './production-company-detail.component';
import { ProductionCompanyPopupComponent } from './production-company-dialog.component';
import { ProductionCompanyDeletePopupComponent } from './production-company-delete-dialog.component';

export const productionCompanyRoute: Routes = [
    {
        path: 'production-company',
        component: ProductionCompanyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCompanies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'production-company/:id',
        component: ProductionCompanyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCompanies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productionCompanyPopupRoute: Routes = [
    {
        path: 'production-company-new',
        component: ProductionCompanyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCompanies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'production-company/:id/edit',
        component: ProductionCompanyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCompanies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'production-company/:id/delete',
        component: ProductionCompanyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCompanies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
