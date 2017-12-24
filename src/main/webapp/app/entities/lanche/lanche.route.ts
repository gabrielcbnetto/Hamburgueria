import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LancheComponent } from './lanche.component';
import { LancheDetailComponent } from './lanche-detail.component';
import { LanchePopupComponent } from './lanche-dialog.component';
import { LancheDeletePopupComponent } from './lanche-delete-dialog.component';

export const lancheRoute: Routes = [
    {
        path: 'lanche',
        component: LancheComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.lanche.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lanche/:id',
        component: LancheDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.lanche.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lanchePopupRoute: Routes = [
    {
        path: 'lanche-new',
        component: LanchePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.lanche.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lanche/:id/edit',
        component: LanchePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.lanche.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lanche/:id/delete',
        component: LancheDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.lanche.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
