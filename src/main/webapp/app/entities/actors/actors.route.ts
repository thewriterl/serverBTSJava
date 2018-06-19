import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ActorsComponent } from './actors.component';
import { ActorsDetailComponent } from './actors-detail.component';
import { ActorsPopupComponent } from './actors-dialog.component';
import { ActorsDeletePopupComponent } from './actors-delete-dialog.component';

export const actorsRoute: Routes = [
    {
        path: 'actors',
        component: ActorsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'actors/:id',
        component: ActorsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const actorsPopupRoute: Routes = [
    {
        path: 'actors-new',
        component: ActorsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'actors/:id/edit',
        component: ActorsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'actors/:id/delete',
        component: ActorsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Actors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
