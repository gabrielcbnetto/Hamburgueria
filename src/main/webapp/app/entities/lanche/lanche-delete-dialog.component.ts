import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Lanche } from './lanche.model';
import { LanchePopupService } from './lanche-popup.service';
import { LancheService } from './lanche.service';

@Component({
    selector: 'jhi-lanche-delete-dialog',
    templateUrl: './lanche-delete-dialog.component.html'
})
export class LancheDeleteDialogComponent {

    lanche: Lanche;

    constructor(
        private lancheService: LancheService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lancheService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lancheListModification',
                content: 'Deleted an lanche'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lanche-delete-popup',
    template: ''
})
export class LancheDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lanchePopupService: LanchePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lanchePopupService
                .open(LancheDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
