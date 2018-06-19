import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DirectorComponent } from './director.component';
import { DirectorDetailComponent } from './director-detail.component';
import { DirectorPopupComponent } from './director-dialog.component';
import { DirectorDeletePopupComponent } from './director-delete-dialog.component';

export const directorRoute: Routes = [
    {
        path: 'director',
        component: DirectorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Directors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'director/:id',
        component: DirectorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Directors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const directorPopupRoute: Routes = [
    {
        path: 'director-new',
        component: DirectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Directors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'director/:id/edit',
        component: DirectorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Directors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'director/:id/delete',
        component: DirectorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Directors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
