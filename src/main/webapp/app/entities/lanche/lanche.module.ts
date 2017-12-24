import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HamburgueriaSharedModule } from '../../shared';
import {
    LancheService,
    LanchePopupService,
    LancheComponent,
    LancheDetailComponent,
    LancheDialogComponent,
    LanchePopupComponent,
    LancheDeletePopupComponent,
    LancheDeleteDialogComponent,
    lancheRoute,
    lanchePopupRoute,
} from './';

const ENTITY_STATES = [
    ...lancheRoute,
    ...lanchePopupRoute,
];

@NgModule({
    imports: [
        HamburgueriaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LancheComponent,
        LancheDetailComponent,
        LancheDialogComponent,
        LancheDeleteDialogComponent,
        LanchePopupComponent,
        LancheDeletePopupComponent,
    ],
    entryComponents: [
        LancheComponent,
        LancheDialogComponent,
        LanchePopupComponent,
        LancheDeleteDialogComponent,
        LancheDeletePopupComponent,
    ],
    providers: [
        LancheService,
        LanchePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HamburgueriaLancheModule {}
