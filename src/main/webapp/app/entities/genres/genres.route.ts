import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GenresComponent } from './genres.component';
import { GenresDetailComponent } from './genres-detail.component';
import { GenresPopupComponent } from './genres-dialog.component';
import { GenresDeletePopupComponent } from './genres-delete-dialog.component';

export const genresRoute: Routes = [
    {
        path: 'genres',
        component: GenresComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'genres/:id',
        component: GenresDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const genresPopupRoute: Routes = [
    {
        path: 'genres-new',
        component: GenresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genres/:id/edit',
        component: GenresPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'genres/:id/delete',
        component: GenresDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Genres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
