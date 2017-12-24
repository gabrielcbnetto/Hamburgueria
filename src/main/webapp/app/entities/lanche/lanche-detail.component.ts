import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Lanche } from './lanche.model';
import { LancheService } from './lanche.service';

@Component({
    selector: 'jhi-lanche-detail',
    templateUrl: './lanche-detail.component.html'
})
export class LancheDetailComponent implements OnInit, OnDestroy {

    lanche: Lanche;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lancheService: LancheService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLanches();
    }

    load(id) {
        this.lancheService.find(id).subscribe((lanche) => {
            this.lanche = lanche;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLanches() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lancheListModification',
            (response) => this.load(this.lanche.id)
        );
    }
}
