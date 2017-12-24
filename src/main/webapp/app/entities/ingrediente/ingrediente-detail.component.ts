import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Ingrediente } from './ingrediente.model';
import { IngredienteService } from './ingrediente.service';

@Component({
    selector: 'jhi-ingrediente-detail',
    templateUrl: './ingrediente-detail.component.html'
})
export class IngredienteDetailComponent implements OnInit, OnDestroy {

    ingrediente: Ingrediente;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ingredienteService: IngredienteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIngredientes();
    }

    load(id) {
        this.ingredienteService.find(id).subscribe((ingrediente) => {
            this.ingrediente = ingrediente;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIngredientes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ingredienteListModification',
            (response) => this.load(this.ingrediente.id)
        );
    }
}
