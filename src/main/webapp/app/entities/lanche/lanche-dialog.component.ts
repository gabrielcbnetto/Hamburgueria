import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Lanche } from './lanche.model';
import { LanchePopupService } from './lanche-popup.service';
import { LancheService } from './lanche.service';

@Component({
    selector: 'jhi-lanche-dialog',
    templateUrl: './lanche-dialog.component.html'
})
export class LancheDialogComponent implements OnInit {

    lanche: Lanche;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private lancheService: LancheService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lanche.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lancheService.update(this.lanche));
        } else {
            this.subscribeToSaveResponse(
                this.lancheService.create(this.lanche));
        }
    }

    private subscribeToSaveResponse(result: Observable<Lanche>) {
        result.subscribe((res: Lanche) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Lanche) {
        this.eventManager.broadcast({ name: 'lancheListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-lanche-popup',
    template: ''
})
export class LanchePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lanchePopupService: LanchePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lanchePopupService
                    .open(LancheDialogComponent as Component, params['id']);
            } else {
                this.lanchePopupService
                    .open(LancheDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
