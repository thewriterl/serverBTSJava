import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PostsComponent } from './posts.component';
import { PostsDetailComponent } from './posts-detail.component';
import { PostsPopupComponent } from './posts-dialog.component';
import { PostsDeletePopupComponent } from './posts-delete-dialog.component';

export const postsRoute: Routes = [
    {
        path: 'posts',
        component: PostsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'posts/:id',
        component: PostsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const postsPopupRoute: Routes = [
    {
        path: 'posts-new',
        component: PostsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'posts/:id/edit',
        component: PostsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'posts/:id/delete',
        component: PostsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
