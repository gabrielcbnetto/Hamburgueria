import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { HamburgueriaSharedModule, UserRouteAccessService } from './shared';
import { HamburgueriaAppRoutingModule} from './app-routing.module';
import { HamburgueriaHomeModule } from './home/home.module';
import { HamburgueriaAdminModule } from './admin/admin.module';
import { HamburgueriaAccountModule } from './account/account.module';
import { HamburgueriaEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        HamburgueriaAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        HamburgueriaSharedModule,
        HamburgueriaHomeModule,
        HamburgueriaAdminModule,
        HamburgueriaAccountModule,
        HamburgueriaEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class HamburgueriaAppModule {}
