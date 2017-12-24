import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IngredienteComponent } from './ingrediente.component';
import { IngredienteDetailComponent } from './ingrediente-detail.component';
import { IngredientePopupComponent } from './ingrediente-dialog.component';
import { IngredienteDeletePopupComponent } from './ingrediente-delete-dialog.component';

export const ingredienteRoute: Routes = [
    {
        path: 'ingrediente',
        component: IngredienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.ingrediente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ingrediente/:id',
        component: IngredienteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.ingrediente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ingredientePopupRoute: Routes = [
    {
        path: 'ingrediente-new',
        component: IngredientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.ingrediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ingrediente/:id/edit',
        component: IngredientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.ingrediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ingrediente/:id/delete',
        component: IngredienteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hamburgueriaApp.ingrediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
