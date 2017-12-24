import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HamburgueriaSharedModule } from '../../shared';
import {
    IngredienteService,
    IngredientePopupService,
    IngredienteComponent,
    IngredienteDetailComponent,
    IngredienteDialogComponent,
    IngredientePopupComponent,
    IngredienteDeletePopupComponent,
    IngredienteDeleteDialogComponent,
    ingredienteRoute,
    ingredientePopupRoute,
} from './';

const ENTITY_STATES = [
    ...ingredienteRoute,
    ...ingredientePopupRoute,
];

@NgModule({
    imports: [
        HamburgueriaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IngredienteComponent,
        IngredienteDetailComponent,
        IngredienteDialogComponent,
        IngredienteDeleteDialogComponent,
        IngredientePopupComponent,
        IngredienteDeletePopupComponent,
    ],
    entryComponents: [
        IngredienteComponent,
        IngredienteDialogComponent,
        IngredientePopupComponent,
        IngredienteDeleteDialogComponent,
        IngredienteDeletePopupComponent,
    ],
    providers: [
        IngredienteService,
        IngredientePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HamburgueriaIngredienteModule {}
