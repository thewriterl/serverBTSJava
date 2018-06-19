import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SpokenLanguagesComponent } from './spoken-languages.component';
import { SpokenLanguagesDetailComponent } from './spoken-languages-detail.component';
import { SpokenLanguagesPopupComponent } from './spoken-languages-dialog.component';
import { SpokenLanguagesDeletePopupComponent } from './spoken-languages-delete-dialog.component';

export const spokenLanguagesRoute: Routes = [
    {
        path: 'spoken-languages',
        component: SpokenLanguagesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SpokenLanguages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'spoken-languages/:id',
        component: SpokenLanguagesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SpokenLanguages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const spokenLanguagesPopupRoute: Routes = [
    {
        path: 'spoken-languages-new',
        component: SpokenLanguagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SpokenLanguages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spoken-languages/:id/edit',
        component: SpokenLanguagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SpokenLanguages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spoken-languages/:id/delete',
        component: SpokenLanguagesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SpokenLanguages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
