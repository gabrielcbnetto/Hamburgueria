import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HamburgueriaIngredienteModule } from './ingrediente/ingrediente.module';
import { HamburgueriaLancheModule } from './lanche/lanche.module';
import { HamburgueriaItemModule } from './item/item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HamburgueriaIngredienteModule,
        HamburgueriaLancheModule,
        HamburgueriaItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HamburgueriaEntityModule {}
