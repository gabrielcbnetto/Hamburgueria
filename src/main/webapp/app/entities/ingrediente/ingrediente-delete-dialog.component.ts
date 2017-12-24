import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ingrediente } from './ingrediente.model';
import { IngredientePopupService } from './ingrediente-popup.service';
import { IngredienteService } from './ingrediente.service';

@Component({
    selector: 'jhi-ingrediente-delete-dialog',
    templateUrl: './ingrediente-delete-dialog.component.html'
})
export class IngredienteDeleteDialogComponent {

    ingrediente: Ingrediente;

    constructor(
        private ingredienteService: IngredienteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ingredienteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ingredienteListModification',
                content: 'Deleted an ingrediente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ingrediente-delete-popup',
    template: ''
})
export class IngredienteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ingredientePopupService: IngredientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ingredientePopupService
                .open(IngredienteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
