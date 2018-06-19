import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductionCountriesComponent } from './production-countries.component';
import { ProductionCountriesDetailComponent } from './production-countries-detail.component';
import { ProductionCountriesPopupComponent } from './production-countries-dialog.component';
import { ProductionCountriesDeletePopupComponent } from './production-countries-delete-dialog.component';

export const productionCountriesRoute: Routes = [
    {
        path: 'production-countries',
        component: ProductionCountriesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCountries'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'production-countries/:id',
        component: ProductionCountriesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCountries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productionCountriesPopupRoute: Routes = [
    {
        path: 'production-countries-new',
        component: ProductionCountriesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCountries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'production-countries/:id/edit',
        component: ProductionCountriesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCountries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'production-countries/:id/delete',
        component: ProductionCountriesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProductionCountries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
