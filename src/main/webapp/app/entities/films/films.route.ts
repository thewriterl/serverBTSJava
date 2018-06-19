import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FilmsComponent } from './films.component';
import { FilmsDetailComponent } from './films-detail.component';
import { FilmsPopupComponent } from './films-dialog.component';
import { FilmsDeletePopupComponent } from './films-delete-dialog.component';

export const filmsRoute: Routes = [
    {
        path: 'films',
        component: FilmsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Films'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'films/:id',
        component: FilmsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Films'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filmsPopupRoute: Routes = [
    {
        path: 'films-new',
        component: FilmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Films'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'films/:id/edit',
        component: FilmsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Films'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'films/:id/delete',
        component: FilmsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Films'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
