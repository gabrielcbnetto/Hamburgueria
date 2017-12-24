import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ingrediente } from './ingrediente.model';
import { IngredientePopupService } from './ingrediente-popup.service';
import { IngredienteService } from './ingrediente.service';
import { Item, ItemService } from '../item';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ingrediente-dialog',
    templateUrl: './ingrediente-dialog.component.html'
})
export class IngredienteDialogComponent implements OnInit {

    ingrediente: Ingrediente;
    isSaving: boolean;

    items: Item[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ingredienteService: IngredienteService,
        private itemService: ItemService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.itemService.query()
            .subscribe((res: ResponseWrapper) => { this.items = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ingrediente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ingredienteService.update(this.ingrediente));
        } else {
            this.subscribeToSaveResponse(
                this.ingredienteService.create(this.ingrediente));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ingrediente>) {
        result.subscribe((res: Ingrediente) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ingrediente) {
        this.eventManager.broadcast({ name: 'ingredienteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackItemById(index: number, item: Item) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ingrediente-popup',
    template: ''
})
export class IngredientePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ingredientePopupService: IngredientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ingredientePopupService
                    .open(IngredienteDialogComponent as Component, params['id']);
            } else {
                this.ingredientePopupService
                    .open(IngredienteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
